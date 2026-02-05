/**
 * Ad-Revenue Genesis Block — Legacy Anchor
 * Project Bison & Campfire (Agüeybaná el Gran Sol 1493 Legacy)
 *
 * Use the signature 'Agüeybaná el Gran Sol 1493' as the genesis block for all incoming ad-revenue.
 */

export const AD_REVENUE_GENESIS_SIGNATURE = 'Agüeybaná el Gran Sol 1493';

export interface AdRevenueGenesisBlock {
  signature: string;
  purpose: string;
  project: string;
  date: string;
  note: string;
}

export const AD_REVENUE_GENESIS: AdRevenueGenesisBlock = {
  signature: AD_REVENUE_GENESIS_SIGNATURE,
  purpose: 'Legacy anchor for all incoming ad-revenue — Bison & Campfire Tribal Abundance Protocol',
  project: 'Bison Above, Campfire Below — Agüeybaná Legacy Abundance Sync',
  date: '2026-02-05',
  note: 'All ad-revenue flows through this genesis block; Taino Cacique peaceful spirit; El Gran Sol lineage',
};
