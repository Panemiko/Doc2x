"use client"
import React, { useState } from 'react';
import './style.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
  
    if (newDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };
  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`App ${sidebarOpen ? '' : 'close'} ${darkMode ? 'dark' : ''}`}>
      <nav className="sidebar">
        <header>
          <div className="image-text">
            <span className="image">
              <img src="logo.jpg" alt="" />
            </span>
            <div className="text logo-text">
              <span className="name">Doc2x</span>
            </div>
          </div>
          <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <a href="#">
                  <span className="text nav-text">Acount</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className='bx bx-home-alt icon' ></i>
                  <span className="text nav-text">Home</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className='bx bx-bar-chart-alt-2 icon' ></i>
                  <span className="text nav-text">Your Projects</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className='bx bx-bell icon'></i>
                  <span className="text nav-text">Notifications</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className='bx bx-heart icon' ></i>
                  <span className="text nav-text">Likes</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="bottom-content">
            <li className="">
              <a href="#">
                <i className='bx bx-log-out icon' ></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>
            <li className="mode" onClick={toggleDarkMode}>
              <div className="sun-moon">
                <i className='bx bx-moon icon moon'></i>
                <i className='bx bx-sun icon sun'></i>
              </div>
              <span className="mode-text text">{darkMode ? 'Light mode' : 'Dark mode'}</span>
              <div className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
      <section className="home">
        <div className="text">Welcome!</div>
        <div className="about">
          <h1>Search</h1>
        </div>
      </section>
      <section className="contents">
        <div>
          <li className="search-box">
            <i className='bx bx-search icon'></i>
            <input type="text" placeholder="Search Projects" />
          </li>
        </div>
        <div className="card-list">
          <a href="#" className="card-item">
            <span className="developer">Starting</span>
            <h3>Electric car project</h3>
            <div className="arrow">
              <i className="fas fa-arrow-right card-icon"></i>
            </div>
          </a>
          <a href="#" className="card-item">
            <span className="designer">Development</span>
            <h3>Project on basic education in schools</h3>
            <div className="arrow">
              <i className="fas fa-arrow-right card-icon"></i>
            </div>
          </a>
          <a href="#" className="card-item">
            <span className="editor">Complete</span>
            <h3>Project on technology among young people</h3>
            <div className="arrow">
              <i className="fas fa-arrow-right card-icon"></i>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;