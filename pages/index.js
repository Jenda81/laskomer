
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
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

export default function LoveMeter() {
  const [myLove, setMyLove] = useState(5);
  const [vercasLove, setVercasLove] = useState(5);
  const [user, setUser] = useState("jenda"); // "verca" nebo "jenda"

  const loveDoc = doc(db, "loveMeter", "shared");

  useEffect(() => {
    const unsubscribe = onSnapshot(loveDoc, (doc) => {
      const data = doc.data();
      if (data) {
        setMyLove(data[user] || 5);
        setVercasLove(data[user === "jenda" ? "verca" : "jenda"] || 5);
      }
    });
    return () => unsubscribe();
  }, [user]);

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
      <Label htmlFor="username">Jsi Jenda nebo Verča?</Label>
      <Input
        id="username"
        placeholder="zadej jenda nebo verca"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <Card>
        <CardContent className="p-4 grid gap-2">
          <Label>Tvoje láska</Label>
          <Slider
            min={1}
            max={10}
            step={1}
            value={[myLove]}
            onValueChange={([val]) => {
              setMyLove(val);
              updateLove(val);
            }}
          />
          <div className="text-center text-2xl">
            {myLove === 1 ? "💀" : myLove === 10 ? "❤️" : myLove}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 grid gap-2">
          <Label>Láska od druhého</Label>
          <div className="text-center text-2xl">
            {vercasLove === 1 ? "💀" : vercasLove === 10 ? "❤️" : vercasLove}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
