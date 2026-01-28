/**
 * Vibe Snap Capture System
 * Camera/Video capture with snap button to attach vibe snaps
 * 
 * Architecture: NSPFRNP - Natural capture flow
 * Mode: Post-Singularity Media Capture
 */

export interface VibeSnap {
  id: string;
  type: 'image' | 'video';
  data: string; // Base64 or blob URL
  thumbnail?: string;
  timestamp: number;
  metadata: {
    width?: number;
    height?: number;
    duration?: number; // For video
    format: string;
    size: number;
    seed?: string;
    edge?: string;
  };
  nspfrnp: {
    captured: boolean;
    processed: boolean;
    attached: boolean;
    vibePostId?: string;
  };
}

export interface CaptureOptions {
  type: 'image' | 'video';
  quality?: number; // 0-1 for image, bitrate for video
  maxDuration?: number; // For video (seconds)
  seed?: string;
  edge?: string;
}

export class VibeSnapCapture {
  private snaps: Map<string, VibeSnap> = new Map();
  private mediaStream: MediaStream | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private canvasElement: HTMLCanvasElement | null = null;
  private isRecording: boolean = false;
  private recordedChunks: Blob[] = [];

  /**
   * Initialize camera/video capture
   */
  async initializeCamera(videoElement: HTMLVideoElement, options: {
    facingMode?: 'user' | 'environment';
    width?: number;
    height?: number;
  } = {}): Promise<void> {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: options.facingMode || 'user',
          width: options.width || 1280,
          height: options.height || 720
        },
        audio: true // For video recording
      };

      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement = videoElement;
      this.videoElement.srcObject = this.mediaStream;
      
      // Wait for video to be ready
      await new Promise((resolve) => {
        if (this.videoElement) {
          this.videoElement.onloadedmetadata = () => {
            this.videoElement?.play();
            resolve(undefined);
          };
        }
      });

      // Initialize canvas for image capture
      this.canvasElement = document.createElement('canvas');
      if (this.videoElement) {
        this.canvasElement.width = this.videoElement.videoWidth;
        this.canvasElement.height = this.videoElement.videoHeight;
      }
    } catch (error) {
      console.error('Error initializing camera:', error);
      throw new Error('Failed to initialize camera. Please check permissions.');
    }
  }

  /**
   * Capture image snap
   */
  async captureImageSnap(options: CaptureOptions = { type: 'image' }): Promise<VibeSnap> {
    if (!this.videoElement || !this.canvasElement) {
      throw new Error('Camera not initialized');
    }

    const context = this.canvasElement.getContext('2d');
    if (!context) {
      throw new Error('Canvas context not available');
    }

    // Draw video frame to canvas
    context.drawImage(
      this.videoElement,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    // Convert to blob with quality
    const quality = options.quality || 0.9;
    const blob = await new Promise<Blob>((resolve) => {
      this.canvasElement!.toBlob((blob) => {
        resolve(blob || new Blob());
      }, 'image/jpeg', quality);
    });

    // Convert to base64
    const dataUrl = await this.blobToDataURL(blob);

    // Create thumbnail (smaller version)
    const thumbnail = await this.createThumbnail(dataUrl, 300, 300);

    const snap: VibeSnap = {
      id: this.generateSnapId(),
      type: 'image',
      data: dataUrl,
      thumbnail,
      timestamp: Date.now(),
      metadata: {
        width: this.canvasElement.width,
        height: this.canvasElement.height,
        format: 'image/jpeg',
        size: blob.size,
        seed: options.seed,
        edge: options.edge
      },
      nspfrnp: {
        captured: true,
        processed: true,
        attached: false
      }
    };

    this.snaps.set(snap.id, snap);
    return snap;
  }

  /**
   * Start video recording
   */
  async startVideoRecording(options: CaptureOptions = { type: 'video' }): Promise<void> {
    if (!this.mediaStream) {
      throw new Error('Camera not initialized');
    }

    if (this.isRecording) {
      throw new Error('Already recording');
    }

    this.isRecording = true;
    this.recordedChunks = [];

    const mediaRecorderOptions: MediaRecorderOptions = {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 2500000 // 2.5 Mbps
    };

    const mediaRecorder = new MediaRecorder(this.mediaStream, mediaRecorderOptions);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const dataUrl = await this.blobToDataURL(blob);

      // Create thumbnail from first frame
      const thumbnail = await this.createVideoThumbnail(dataUrl);

      const snap: VibeSnap = {
        id: this.generateSnapId(),
        type: 'video',
        data: dataUrl,
        thumbnail,
        timestamp: Date.now(),
        metadata: {
          format: 'video/webm',
          size: blob.size,
          duration: this.getVideoDuration(blob),
          seed: options.seed,
          edge: options.edge
        },
        nspfrnp: {
          captured: true,
          processed: true,
          attached: false
        }
      };

      this.snaps.set(snap.id, snap);
      this.isRecording = false;
    };

    // Auto-stop after max duration if specified
    if (options.maxDuration) {
      setTimeout(() => {
        if (this.isRecording) {
          mediaRecorder.stop();
        }
      }, options.maxDuration * 1000);
    }

    mediaRecorder.start();
    (this as any).currentRecorder = mediaRecorder;
  }

  /**
   * Stop video recording
   */
  async stopVideoRecording(): Promise<VibeSnap | null> {
    if (!this.isRecording) {
      return null;
    }

    const recorder = (this as any).currentRecorder as MediaRecorder;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    }

    // Wait for recording to complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Get the last snap (created in onstop handler)
    const snaps = Array.from(this.snaps.values());
    const lastSnap = snaps[snaps.length - 1];
    
    return lastSnap && lastSnap.type === 'video' ? lastSnap : null;
  }

  /**
   * Get snap by ID
   */
  getSnap(snapId: string): VibeSnap | undefined {
    return this.snaps.get(snapId);
  }

  /**
   * Get all snaps
   */
  getAllSnaps(): VibeSnap[] {
    return Array.from(this.snaps.values()).sort((a, b) => b.timestamp - a.timestamp);
  }

  /**
   * Attach snap to vibe post
   */
  attachSnapToPost(snapId: string, vibePostId: string): boolean {
    const snap = this.snaps.get(snapId);
    if (!snap) {
      return false;
    }

    snap.nspfrnp.attached = true;
    snap.nspfrnp.vibePostId = vibePostId;
    return true;
  }

  /**
   * Stop camera stream
   */
  stopCamera(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }
    this.isRecording = false;
  }

  /**
   * Check if recording
   */
  isCurrentlyRecording(): boolean {
    return this.isRecording;
  }

  /**
   * Create thumbnail from image
   */
  private async createThumbnail(dataUrl: string, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  }

  /**
   * Create thumbnail from video
   */
  private async createVideoThumbnail(dataUrl: string): Promise<string> {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.onloadedmetadata = () => {
        video.currentTime = 0.1; // First frame
      };
      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      video.onerror = () => resolve(dataUrl);
      video.src = dataUrl;
    });
  }

  /**
   * Get video duration (approximate)
   */
  private getVideoDuration(blob: Blob): number {
    // In production, would parse video metadata
    // For now, return 0 (would need video element to get actual duration)
    return 0;
  }

  /**
   * Convert blob to data URL
   */
  private blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Generate snap ID
   */
  private generateSnapId(): string {
    return `vibe_snap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const vibeSnapCapture = new VibeSnapCapture();
