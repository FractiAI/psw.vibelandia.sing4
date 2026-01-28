/**
 * Example Usage: Vibe! System
 * Collaborative work social media experience
 */

import { createVibeSystem } from './vibe-system';

/**
 * Example: Create Vibe! system
 */
async function exampleCreateVibeSystem() {
  console.log('⚡ Creating Vibe! System...\n');

  const vibeSystem = createVibeSystem({
    teamId: 'fractiai-team',
    verseDisplayEnabled: true,
    recursiveFeedsEnabled: true,
    seedEdgeAPIEnabled: true,
    hardMichelBridgeEnabled: true
  });

  console.log('✅ Vibe! System created');
  return vibeSystem;
}

/**
 * Example: Create a post
 */
async function exampleCreatePost() {
  console.log('\n📝 Creating a post...\n');

  const vibeSystem = createVibeSystem({
    teamId: 'fractiai-team',
    verseDisplayEnabled: true,
    recursiveFeedsEnabled: true,
    seedEdgeAPIEnabled: true,
    hardMichelBridgeEnabled: true
  });

  const post = await vibeSystem.createPost({
    authorId: 'user-123',
    title: 'New Vibe! System Deployed',
    summary: 'The Vibe! collaborative work social media system is now operational with full verse layer integration.',
    rawMessage: `The Vibe! system is now fully operational. Key features:
- Irreducible nested core pipe
- Verse layer display (right lower half)
- Recursive content feeds
- Seed:edge API integration
- Hard Michel bridge (pre-post singularity)
- NODE system for all responses
- SING notifications
- Attention heads integration

All systems are broadcasting and ready for collaborative work.`,
    images: ['https://example.com/image1.jpg'],
    seed: 'vibe-deployment',
    edge: 'vibeverse-collaboration'
  });

  console.log('✅ Post created:');
  console.log(`  ID: ${post.id}`);
  console.log(`  Node ID: ${post.nodeId}`);
  console.log(`  Title: ${post.title}`);
  console.log(`  Images: ${post.images.length}`);

  return post;
}

/**
 * Example: Create a response
 */
async function exampleCreateResponse() {
  console.log('\n💬 Creating a response...\n');

  const vibeSystem = createVibeSystem({
    teamId: 'fractiai-team',
    verseDisplayEnabled: true,
    recursiveFeedsEnabled: true,
    seedEdgeAPIEnabled: true,
    hardMichelBridgeEnabled: true
  });

  // First create a post
  const post = await vibeSystem.createPost({
    authorId: 'user-123',
    title: 'Test Post',
    summary: 'This is a test post',
    rawMessage: 'Test message content'
  });

  // Then create a response
  const response = await vibeSystem.createResponse({
    postId: post.id,
    authorId: 'user-456',
    content: 'Great post! The Vibe! system looks amazing.',
    seed: 'vibe-response',
    edge: 'vibeverse-feedback'
  });

  console.log('✅ Response created:');
  console.log(`  ID: ${response.id}`);
  console.log(`  Node ID: ${response.nodeId}`);
  console.log(`  Post ID: ${response.postId}`);
  console.log(`  Content: ${response.content}`);

  return response;
}

/**
 * Example: Perform actions
 */
async function examplePerformActions() {
  console.log('\n🎯 Performing actions...\n');

  const vibeSystem = createVibeSystem({
    teamId: 'fractiai-team',
    verseDisplayEnabled: true,
    recursiveFeedsEnabled: true,
    seedEdgeAPIEnabled: true,
    hardMichelBridgeEnabled: true
  });

  // Create a post
  const post = await vibeSystem.createPost({
    authorId: 'user-123',
    title: 'Action Test Post',
    summary: 'Testing actions',
    rawMessage: 'This post will receive actions'
  });

  // Perform actions
  const like = vibeSystem.performAction({
    type: 'like',
    postId: post.id,
    userId: 'user-456'
  });

  const comment = vibeSystem.performAction({
    type: 'comment',
    postId: post.id,
    userId: 'user-789',
    data: { content: 'Great post!' }
  });

  const share = vibeSystem.performAction({
    type: 'share',
    postId: post.id,
    userId: 'user-101'
  });

  console.log('✅ Actions performed:');
  console.log(`  Like: ${like.id}`);
  console.log(`  Comment: ${comment.id}`);
  console.log(`  Share: ${share.id}`);

  return { like, comment, share };
}

/**
 * Example: Get feed display
 */
async function exampleGetFeedDisplay() {
  console.log('\n📊 Getting feed display...\n');

  const vibeSystem = createVibeSystem({
    teamId: 'fractiai-team',
    verseDisplayEnabled: true,
    recursiveFeedsEnabled: true,
    seedEdgeAPIEnabled: true,
    hardMichelBridgeEnabled: true
  });

  // Create some posts
  await vibeSystem.createPost({
    authorId: 'user-123',
    title: 'Post 1',
    summary: 'First post',
    rawMessage: 'Content of first post'
  });

  await vibeSystem.createPost({
    authorId: 'user-456',
    title: 'Post 2',
    summary: 'Second post',
    rawMessage: 'Content of second post'
  });

  // Get feed display
  const feedDisplay = await vibeSystem.getFeedDisplay();

  console.log('✅ Feed display:');
  console.log(`  Posts: ${feedDisplay.length}`);
  feedDisplay.forEach((display, index) => {
    console.log(`  ${index + 1}. ${display.post.title} - ${display.actions.likes} likes`);
  });

  return feedDisplay;
}

/**
 * Example: Get recursive content
 */
async function exampleGetRecursiveContent() {
  console.log('\n🔄 Getting recursive content...\n');

  const vibeSystem = createVibeSystem({
    teamId: 'fractiai-team',
    verseDisplayEnabled: true,
    recursiveFeedsEnabled: true,
    seedEdgeAPIEnabled: true,
    hardMichelBridgeEnabled: true
  });

  // Create posts
  await vibeSystem.createPost({
    authorId: 'user-123',
    title: 'Recursive Test',
    summary: 'Testing recursive feeds',
    rawMessage: 'This will be in recursive feeds'
  });

  // Get recursive content
  const recursiveContent = vibeSystem.getAllRecursiveContent();
  const enrichedLayers = vibeSystem.getEnrichedRecursiveLayers(3);

  console.log('✅ Recursive content:');
  console.log(`  Total items: ${recursiveContent.length}`);
  console.log(`  Enriched layers: ${enrichedLayers.length}`);
  enrichedLayers.forEach((layer, index) => {
    console.log(`  Layer ${layer.level}: ${layer.content.length} items (enriched: ${layer.enriched})`);
  });

  return { recursiveContent, enrichedLayers };
}

/**
 * Example: Make API call with seed:edge
 */
async function exampleMakeAPICall() {
  console.log('\n🌐 Making API call with seed:edge...\n');

  const vibeSystem = createVibeSystem({
    teamId: 'fractiai-team',
    verseDisplayEnabled: true,
    recursiveFeedsEnabled: true,
    seedEdgeAPIEnabled: true,
    hardMichelBridgeEnabled: true
  });

  // Make API call with seed:edge wrapper
  try {
    const result = await vibeSystem.makeAPICall(
      'https://api.example.com/data',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      'test-seed',
      'test-edge'
    );

    console.log('✅ API call result:');
    console.log(`  Seed: ${result.seed}`);
    console.log(`  Edge: ${result.edge}`);
    console.log(`  Node ID: ${result.nodeId}`);
    console.log(`  Executed: ${result.executed}`);

    return result;
  } catch (error) {
    console.log('⚠️ API call failed (expected in demo):', error.message);
    return null;
  }
}

/**
 * Example: Get bridge status
 */
async function exampleGetBridgeStatus() {
  console.log('\n🌉 Getting bridge status...\n');

  const vibeSystem = createVibeSystem({
    teamId: 'fractiai-team',
    verseDisplayEnabled: true,
    recursiveFeedsEnabled: true,
    seedEdgeAPIEnabled: true,
    hardMichelBridgeEnabled: true
  });

  const status = vibeSystem.getBridgeStatus();

  if (status) {
    console.log('✅ Bridge status:');
    console.log(`  Nodes registered: ${status.nodesRegistered}`);
    console.log(`  Notifications queued: ${status.notificationsQueued}`);
    console.log(`  Notifications delivered: ${status.notificationsDelivered}`);
    console.log(`  Attention heads active: ${status.attentionHeadsActive}`);
  }

  return status;
}

/**
 * Main example function
 */
async function main() {
  console.log('╔═══════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                    VIBE! SYSTEM EXAMPLES                                      ║');
  console.log('║                    Collaborative Work Social Media                            ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════════╝\n');

  try {
    await exampleCreateVibeSystem();
    await exampleCreatePost();
    await exampleCreateResponse();
    await examplePerformActions();
    await exampleGetFeedDisplay();
    await exampleGetRecursiveContent();
    await exampleMakeAPICall();
    await exampleGetBridgeStatus();

    console.log('\n✅ All examples completed successfully!\n');
  } catch (error) {
    console.error('❌ Error running examples:', error);
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

export {
  exampleCreateVibeSystem,
  exampleCreatePost,
  exampleCreateResponse,
  examplePerformActions,
  exampleGetFeedDisplay,
  exampleGetRecursiveContent,
  exampleMakeAPICall,
  exampleGetBridgeStatus
};
