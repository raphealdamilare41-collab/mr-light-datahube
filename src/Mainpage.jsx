import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUniversity,
  FaMobileAlt,
  FaDatabase,
  FaTv,
  FaBolt,
  FaFileInvoiceDollar,
  FaHome
} from 'react-icons/fa';

export default function Mainpage() {
  const [activeTab, setActiveTab] = useState(null);

  const palette = {
    bg: 'linear-gradient(135deg, #f53e1d, #1a63c4,  #4ba70d)',
    panel: 'rgba(255,255,255,0.95)',
    text: '#0f172a',
    muted: '#475569',
    accent: '#f59e0b',
    accent2: '#2563eb',
    border: 'rgba(148, 163, 184, 0.35)',
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: palette.bg,
      padding: '2rem 1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    panel: {
      width: '100%',
      maxWidth: '1100px',
      background: palette.panel,
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
    },
    title: {
      textAlign: 'center',
      margin: '0 0 1.5rem',
      color: palette.text,
      fontSize: '2rem',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      gap: 16,
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      margin: '0 auto',
      width: '100%',
      maxWidth: 920,
    },
  };

  const serviceStyles = {
    wrapper: { position: 'relative' },
    button: {
      padding: '14px 18px',
      borderRadius: 16,
      border: '1px solid rgba(37, 99, 235, 0.2)',
      background: 'linear-gradient(135deg, #fef3c7, #dbeafe)',
      cursor: 'pointer',
      minWidth: 150,
      textAlign: 'center',
      color: palette.text,
      fontWeight: 700,
      boxShadow: '0 8px 20px rgba(37, 99, 235, 0.12)',
      display: 'inline-block',
      textDecoration: 'none',
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 8,
      background: '#fff',
      border: '1px solid palette.border',
      borderRadius: 12,
      minWidth: 170,
      padding: 0,
      listStyle: 'none',
      boxShadow: '0 8px 20px rgba(15, 23, 42, 0.12)',
      zIndex: 2,
    },
    option: {
      padding: '10px 12px',
      textAlign: 'left',
      color: palette.text,
      borderBottom: '1px solid #e2e8f0',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.panel}>
        <h1 style={styles.title}>HOME
        <FaHome size={22}  /></h1>

        <div style={styles.row}>
          <div style={serviceStyles.wrapper}>
            <Link to="/airtime" style={serviceStyles.button}>Airtime   <FaMobileAlt size={19}color={palette.accent2}/></Link> 
           
          </div>

          <div style={serviceStyles.wrapper}>
            <Link to="/data" style={serviceStyles.button}>Data <br />   <FaDatabase size={19}color={palette.accent2} /> </Link>
        
          </div>

            <div style={styles.row}>
          <div style={serviceStyles.wrapper}>
            <Link to="/bank" style={serviceStyles.button}>Bank <br />
            <FaUniversity size={19} color={palette.accent2}/></Link> 
           
          </div>

          <div style={serviceStyles.wrapper}>
            <button style={serviceStyles.button} onClick={() => setActiveTab('cable')} aria-expanded={activeTab === 'cable'}>Cable  <br />
             <FaTv size={19}color={palette.accent2}/> </button>
            {activeTab === 'cable' && (
              <ul style={serviceStyles.dropdown}>
                <li style={serviceStyles.option}>Startimes</li>
                <li style={serviceStyles.option}>DStv</li>
                <li style={serviceStyles.option}>GoTV</li>
              </ul>
            )} <br />
         
          </div>

          <div style={serviceStyles.wrapper}>
            <button style={serviceStyles.button} onClick={() => setActiveTab('electricity')} aria-expanded={activeTab === 'electricity'}>Electricity  <br />
              <FaBolt size={19}color={palette.accent2} />  </button>
            {activeTab === 'electricity' && (
              <ul style={serviceStyles.dropdown}>
                <li style={serviceStyles.option}>Prepaid</li>
                <li style={serviceStyles.option}>Postpaid</li>
              </ul>
            )}
        
          </div>

          <div style={serviceStyles.wrapper}>
            <button style={serviceStyles.button} onClick={() => setActiveTab('bills')} aria-expanded={activeTab === 'bills'}>Bills
              <br /><FaFileInvoiceDollar size={19} color={palette.accent2}/></button>
            {activeTab === 'bills' && (
              <ul style={serviceStyles.dropdown}>
                <li style={serviceStyles.option}>Internet</li>
                <li style={serviceStyles.option}>Insurance</li>
                <li style={serviceStyles.option}>Subscriptions</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
    
       </div>
  );
}
