import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Copy user uploaded images and video to public directory on startup
try {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Copy user uploaded photos
  const uploadedDir = 'C:\\Users\\sizzlers\\.gemini\\antigravity-ide\\brain\\99c9bdfd-21ea-44dd-ac67-4ce82b9af8e2\\.user_uploaded';
  if (fs.existsSync(uploadedDir)) {
    fs.copyFileSync(path.join(uploadedDir, 'media_1791455869523.jpg'), path.join(publicDir, 'uploaded-jatayu.jpg'));
    fs.copyFileSync(path.join(uploadedDir, 'media_1791455869611.jpg'), path.join(publicDir, 'uploaded-thailand.jpg'));
    fs.copyFileSync(path.join(uploadedDir, 'media_1791455869782.jpg'), path.join(publicDir, 'uploaded-safari.jpg'));
    fs.copyFileSync(path.join(uploadedDir, 'media_1791455869840.jpg'), path.join(publicDir, 'uploaded-wonders.jpg'));
  }
} catch (e) {
  console.log('File copy helper notice:', e.message);
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});

