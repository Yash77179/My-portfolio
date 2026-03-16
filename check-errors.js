import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  
  await page.goto('http://localhost:5177/My-portfolio/');
  await new Promise(r => setTimeout(r, 2000));
  
  console.log("Simulating click and drag...");
  await page.mouse.move(500, 500);
  await page.mouse.down();
  await page.mouse.move(600, 600, {steps: 10});
  await new Promise(r => setTimeout(r, 500));
  await page.mouse.up();
  
  await new Promise(r => setTimeout(r, 5000));
  await browser.close();
})();