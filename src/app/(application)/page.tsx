import React from 'react';
import './style.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Our Website!</h1>
      </header>
      <main>
        <section>
          <h2>About Us</h2>
          <p>We are a company dedicated to providing the best service.</p>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>Email: info@ourwebsite.com</p>
          <p>Phone: 123-456-7890</p>
        </section>
      </main>
      <footer className="App-footer">
        <p>© 2023 Our Website</p>
      </footer>
    </div>
  );
}

export default App;