const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse() {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
        logLevel: 'info',
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        port: chrome.port,
    };

    const runnerResult = await lighthouse('http://localhost:5173', options);

    // Output the results
    console.log('Lighthouse Results:');
    console.log('==================');

    const { lhr } = runnerResult;

    console.log(`Performance: ${lhr.categories.performance.score * 100}`);
    console.log(`Accessibility: ${lhr.categories.accessibility.score * 100}`);
    console.log(`Best Practices: ${lhr.categories['best-practices'].score * 100}`);
    console.log(`SEO: ${lhr.categories.seo.score * 100}`);

    console.log('\nDetailed Results:');
    console.log('=================');

    // Performance metrics
    console.log('\nPerformance Metrics:');
    console.log(`First Contentful Paint: ${lhr.audits['first-contentful-paint'].displayValue}`);
    console.log(`Largest Contentful Paint: ${lhr.audits['largest-contentful-paint'].displayValue}`);
    console.log(`Cumulative Layout Shift: ${lhr.audits['cumulative-layout-shift'].displayValue}`);
    console.log(`Total Blocking Time: ${lhr.audits['total-blocking-time'].displayValue}`);

    // SEO audits
    console.log('\nSEO Audits:');
    console.log(`Meta Description: ${lhr.audits['meta-description'].score === 1 ? '✅' : '❌'}`);
    console.log(`Document Title: ${lhr.audits['document-title'].score === 1 ? '✅' : '❌'}`);
    console.log(`HTTPS: ${lhr.audits['is-on-https'].score === 1 ? '✅' : '❌'}`);

    await chrome.kill();
}

runLighthouse().catch(console.error);
