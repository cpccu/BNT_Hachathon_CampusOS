const fs = require('fs');
const path = require('path');

const replacements = [
  { search: /Jordan Patel/g, replace: 'Junaid Parvez' },
  { search: /Alex Chen/g, replace: 'Abir Chowdhury' },
  { search: /Dr\. Elena Vance/g, replace: 'Dr. Nusrat Jahan' },
  { search: /Prof\. Marcus Thorne/g, replace: 'Prof. Kamal Hossain' },
  { search: /Dr\. Rachel Kim/g, replace: 'Dr. Farhana Yasmin' },
  { search: /Maya Lin/g, replace: 'Marium Lipi' },
  { search: /David Goldstein/g, replace: 'Zahid Hasan' },
  { search: /Camila Ruiz/g, replace: 'Nadia Rahman' },
  { search: /CityHack 2026 —/g, replace: "CPCCU Hackathon '26 —" },
  { search: /CityHack 2026/g, replace: "CPCCU Hackathon '26" },
  { search: /City Financial Trading & Quant Club/g, replace: 'CityUni Finance & Business Society' },
  { search: /Urban Photography & Media Collective/g, replace: 'CityUni Photography Society' },
];

const filesToUpdate = [
  'src/data/mockData.ts',
  'src/app/login/page.tsx',
  'src/components/Navbar.tsx',
  'src/app/page.tsx',
  'src/app/admin/page.tsx',
  'src/app/resources/page.tsx',
  'README.md',
];

filesToUpdate.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let updated = content;
    replacements.forEach(r => {
      updated = updated.replace(r.search, r.replace);
    });
    if (content !== updated) {
      fs.writeFileSync(fullPath, updated, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
