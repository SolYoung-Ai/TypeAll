import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import HomePage from '@/pages/HomePage/HomePage';
import TestsPage from '@/pages/TestsPage/TestsPage';
import TestPage from '@/pages/TestPage/TestPage';
import ResultPage from '@/pages/ResultPage/ResultPage';
import AboutPage from '@/pages/AboutPage/AboutPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tests" element={<TestsPage />} />
        <Route path="test/:id" element={<TestPage />} />
        <Route path="result/:id/:attemptId" element={<ResultPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
