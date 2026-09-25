const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function extractPDF(filename) {
  const buf = fs.readFileSync(filename);
  const parser = new PDFParse({ verbosity: 0, data: new Uint8Array(buf) });
  await parser.load(undefined);
  const data = await parser.getText();
  return data.pages.map(p => p.text).join('\n\n--- PAGE BREAK ---\n\n');
}

async function main() {
  const pdfs = ['aula-04-lab-1.pdf', 'aula-05-lab.pdf', 'aula-06-lab.pdf'];
  
  for (const pdf of pdfs) {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`FILE: ${pdf}`);
    console.log('='.repeat(70));
    const text = await extractPDF(pdf);
    // Save to txt file
    const outFile = pdf.replace('.pdf', '.txt');
    fs.writeFileSync(outFile, text, 'utf8');
    console.log(`Saved to ${outFile} (${text.length} chars)`);
    console.log('\nFIRST 3000 CHARS:');
    console.log(text.substring(0, 3000));
  }
}

main().catch(console.error);
