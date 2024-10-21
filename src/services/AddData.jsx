import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "./firebase-config";

const AddData = () => {
  const [data, setData] = useState("");

  const handleAddData = async () => {
    try {
      await addDoc(collection(firestore, "myCollection"), {
        data: data,
        timestamp: new Date(),
      });
      alert("Datos agregados exitosamente");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Agregar Datos</h2>
      <input
        type="text"
        placeholder="Ingrese datos"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={handleAddData}>Agregar</button>
    </div>
  );
};

export default AddData;
