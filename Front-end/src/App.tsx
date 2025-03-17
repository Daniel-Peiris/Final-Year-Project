import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Banner } from './components/Banner';
import { Navigation } from './components/Navigation';
import { SearchBar } from './components/SearchBar';
import { Calculator } from './components/Calculator';
import { CropList } from './components/CropList';
import { CropDetail } from './components/CropDetail';
import { KnowledgeBase } from './components/KnowledgeBase';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Banner />
        
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <SearchBar />
          
          <Routes>
            <Route path="/" element={<CropList />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/crops/:id" element={<CropDetail />} />
          </Routes>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Harvest Planning</h2>
            <Calculator />
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App