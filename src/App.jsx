import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';

function App() {
    return (
        <>
            <Header />
            <MainContent></MainContent>
            <Footer />
        </>
    );
}

export default App;
