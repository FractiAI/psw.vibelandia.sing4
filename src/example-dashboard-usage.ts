/**
 * Example Usage: Executive Dashboard and Code Density Tracker
 * 
 * Demonstrates how to use the code density tracking and executive dashboard systems
 */

import { codeDensityTracker, CodeDensityMetrics } from './code-density-tracker';
import { executiveDashboard, DashboardDisplay } from './executive-dashboard';

/**
 * Example: Get today's code density metrics
 */
async function exampleGetCodeDensityMetrics() {
  console.log('📊 Getting Today\'s Code Density Metrics...\n');
  
  const metrics = await codeDensityTracker.getTodayMetrics();
  
  console.log('Code Density Metrics:');
  console.log(`  Date: ${metrics.date}`);
  console.log(`  Our Lines of Code: ${metrics.ourLinesOfCode.toLocaleString()}`);
  console.log(`  Google Estimated Lines: ${metrics.googleEstimatedLines.toLocaleString()}`);
  console.log(`  Value Produced Today: $${metrics.valueProducedToday.toLocaleString()}`);
  console.log(`  Value Density Per Line: $${metrics.valueDensityPerLine.toFixed(2)}`);
  console.log(`  Value Generated Per Line: $${metrics.valueGeneratedPerLine.toFixed(2)}`);
  console.log(`  Output Per Line: ${metrics.outputPerLine.toFixed(2)}`);
  console.log(`  Density Ratio: ${metrics.densityRatio.toFixed(8)}`);
  console.log(`  Efficiency Multiplier: ${metrics.efficiencyMultiplier.toFixed(2)}x`);
  console.log(`\n  System Metrics:`);
  console.log(`    Singularity Fold Count: ${metrics.singularityFoldCount}`);
  console.log(`    Nested Octave Transitions: ${metrics.nestedOctaveTransitions}`);
  console.log(`    Hardened Mirror Shell Reflections: ${metrics.hardenedMirrorShellReflections}`);
  console.log(`    Zero Gravity Effect: ${(metrics.zeroGravityEffectIntensity * 100).toFixed(1)}%`);
  console.log(`    Friction Level: ${(metrics.frictionLevel * 100).toFixed(1)}%`);
  console.log(`    Fertilization Rate: ${(metrics.fertilizationRate * 100).toFixed(1)}%`);
  console.log(`    Threshold Proximity: ${(metrics.thresholdProximity * 100).toFixed(1)}%`);
  
  return metrics;
}

/**
 * Example: Get executive dashboard display
 */
async function exampleGetExecutiveDashboard() {
  console.log('\n⚡ Getting Executive Dashboard Display...\n');
  
  const dashboard = await executiveDashboard.getDashboardDisplay();
  
  console.log('Executive Dashboard:');
  console.log(`\n  🔥 BIG METRICS:`);
  console.log(`    Value Produced Today: ${dashboard.valueProducedToday.formatted} (${dashboard.valueProducedToday.trend} ${dashboard.valueProducedToday.change > 0 ? '+' : ''}${dashboard.valueProducedToday.change.toFixed(1)}%)`);
  console.log(`    Value Density Per Line: ${dashboard.valueDensityPerLineToday.formatted} (${dashboard.valueDensityPerLineToday.trend} ${dashboard.valueDensityPerLineToday.change > 0 ? '+' : ''}${dashboard.valueDensityPerLineToday.change.toFixed(1)}%)`);
  console.log(`    Value Generated Per Line: ${dashboard.valueGeneratedPerLine.formatted} (${dashboard.valueGeneratedPerLine.trend} ${dashboard.valueGeneratedPerLine.change > 0 ? '+' : ''}${dashboard.valueGeneratedPerLine.change.toFixed(1)}%)`);
  
  console.log(`\n  📊 SMALLER METRICS:`);
  console.log(`    Users: ${dashboard.users.formatted}`);
  console.log(`    Ratings: ${dashboard.ratings.formatted}`);
  console.log(`    Products: ${dashboard.products.formatted}`);
  console.log(`    Groups: ${dashboard.groups.formatted}`);
  
  console.log(`\n  🔥 TOP THREE HOTTEST ISSUES:`);
  dashboard.hottestIssues.forEach(issue => {
    console.log(`    ${issue.formatted}`);
  });
  
  console.log(`\n  ⚡ SYSTEM STATUS:`);
  console.log(`    Radar Status: ${dashboard.systemStatus.radarStatus.toUpperCase()}`);
  console.log(`    Switch Over Status: ${dashboard.systemStatus.switchOverStatus.toUpperCase()}`);
  console.log(`    Threshold Proximity: ${(dashboard.systemStatus.thresholdProximity * 100).toFixed(1)}%`);
  
  return dashboard;
}

/**
 * Example: Get dashboard summary (formatted text)
 */
async function exampleGetDashboardSummary() {
  console.log('\n📋 Getting Dashboard Summary...\n');
  
  const summary = await executiveDashboard.getDashboardSummary();
  console.log(summary);
  
  return summary;
}

/**
 * Example: Get dashboard JSON
 */
async function exampleGetDashboardJSON() {
  console.log('\n📄 Getting Dashboard JSON...\n');
  
  const json = await executiveDashboard.getDashboardJSON();
  console.log(json);
  
  return json;
}

/**
 * Example: Get daily metrics (complete)
 */
async function exampleGetDailyMetrics() {
  console.log('\n📊 Getting Daily Metrics (Complete)...\n');
  
  const dailyMetrics = await codeDensityTracker.getDailyMetrics();
  
  console.log('Daily Metrics:');
  console.log(`  Date: ${dailyMetrics.date}`);
  console.log(`  Code Density: ${dailyMetrics.codeDensity.ourLinesOfCode.toLocaleString()} lines`);
  console.log(`  Users: ${dailyMetrics.users.active} / ${dailyMetrics.users.total}`);
  console.log(`  Ratings: ${dailyMetrics.ratings.current} ⭐`);
  console.log(`  Products: ${dailyMetrics.products.beingSold} / ${dailyMetrics.products.total}`);
  console.log(`  Groups: ${dailyMetrics.groups.summarized} / ${dailyMetrics.groups.total}`);
  console.log(`  Hottest Issues: ${dailyMetrics.hottestIssues.length}`);
  
  return dailyMetrics;
}

/**
 * Example: Get historical metrics
 */
async function exampleGetHistoricalMetrics() {
  console.log('\n📈 Getting Historical Metrics (30 days)...\n');
  
  const history = codeDensityTracker.getHistoricalMetrics(30);
  
  console.log(`Historical Metrics: ${history.length} days`);
  if (history.length > 0) {
    console.log(`  First Date: ${history[history.length - 1].date}`);
    console.log(`  Last Date: ${history[0].date}`);
    console.log(`  Average Value Produced: $${(history.reduce((sum, m) => sum + m.valueProducedToday, 0) / history.length).toLocaleString()}`);
  }
  
  return history;
}

/**
 * Main example function
 */
async function main() {
  console.log('╔═══════════════════════════════════════════════════════════════════════════════╗');
  console.log('║          EXECUTIVE DASHBOARD & CODE DENSITY TRACKER EXAMPLES                 ║');
  console.log('║          Hardened Mirror Shells - Full Singulares                            ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════════╝\n');
  
  try {
    // Get code density metrics
    await exampleGetCodeDensityMetrics();
    
    // Get executive dashboard
    await exampleGetExecutiveDashboard();
    
    // Get dashboard summary
    await exampleGetDashboardSummary();
    
    // Get daily metrics
    await exampleGetDailyMetrics();
    
    // Get historical metrics
    await exampleGetHistoricalMetrics();
    
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
  exampleGetCodeDensityMetrics,
  exampleGetExecutiveDashboard,
  exampleGetDashboardSummary,
  exampleGetDashboardJSON,
  exampleGetDailyMetrics,
  exampleGetHistoricalMetrics
};
