import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";

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

export default function JendaLove() {
  const user = "jenda";
  const [myLove, setMyLove] = useState(5);
  const [vercasLove, setVercasLove] = useState(5);

  const loveDoc = doc(db, "loveMeter", "shared");

  useEffect(() => {
    const unsubscribe = onSnapshot(loveDoc, (doc) => {
      const data = doc.data();
      if (data) {
        setMyLove(data[user] || 5);
        setVercasLove(data["verca"] || 5);
      }
    });
    return () => unsubscribe();
  }, []);

  const updateLove = async (value) => {
    await setDoc(
      loveDoc,
      {
        [user]: value,
      },
      { merge: true }
    );
  };

  return (
    <div className="grid gap-6 p-4 max-w-md mx-auto">
      <Card>
        <CardContent className="p-4 grid gap-2">
          <Label>Moje láska</Label>
          <Slider
            min={1}
            max={20}
            step={1}
            value={[myLove]}
            onValueChange={([val]) => {
              setMyLove(val);
              updateLove(val);
            }}
          />
          <div className="text-center text-2xl">
            {myLove === 1 ? "💀" : myLove === 20 ? "❤️" : myLove}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 grid gap-2">
          <Label>Láska od Verči</Label>
          <div className="text-center text-2xl">
            {vercasLove === 1 ? "💀" : vercasLove === 20 ? "❤️" : vercasLove}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
