
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANAsA7JNDqt1AeumqD81XDBGIR34BWJ68",
  authDomain: "laskomer-jenda.firebaseapp.com",
  projectId: "laskomer-jenda",
  storageBucket: "laskomer-jenda.firebasestorage.app",
  messagingSenderId: "779316263600",
  appId: "1:779316263600:web:ee95570fe980d031e31975"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const [myLove, setMyLove] = useState(5);
  const [vercasLove, setVercasLove] = useState(5);
  const [user, setUser] = useState('jenda');

  const loveDoc = doc(db, 'loveMeter', 'shared');

  useEffect(() => {
    const unsubscribe = onSnapshot(loveDoc, (doc) => {
      const data = doc.data();
      if (data) {
        setMyLove(data[user] || 5);
        setVercasLove(data[user === 'jenda' ? 'verca' : 'jenda'] || 5);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const updateLove = async (value) => {
    await setDoc(loveDoc, { [user]: value }, { merge: true });
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, fontFamily: 'Arial' }}>
      <h2>Láskoměr 💘</h2>
      <label>Zadej své jméno (jenda / verca):</label>
      <input
        value={user}
        onChange={(e) => setUser(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 16 }}
      />
      <label>Moje láska:</label>
      <input
        type="range"
        min="1"
        max="10"
        value={myLove}
        onChange={(e) => {
          const val = parseInt(e.target.value);
          setMyLove(val);
          updateLove(val);
        }}
        style={{ width: '100%' }}
      />
      <div style={{ textAlign: 'center', fontSize: 24 }}>
        {myLove === 1 ? '💀' : myLove === 10 ? '❤️' : myLove}
      </div>

      <hr style={{ margin: '20px 0' }} />

      <label>Láska od druhého:</label>
      <div style={{ textAlign: 'center', fontSize: 24 }}>
        {vercasLove === 1 ? '💀' : vercasLove === 10 ? '❤️' : vercasLove}
      </div>
    </div>
  );
}
