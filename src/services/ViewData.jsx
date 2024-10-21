import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "./firebase-config";

const ViewData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Forms"));
        const dataList = querySnapshot.docs.map((doc) => doc.data());
        setData(dataList);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  console.log(data);
  return (
    <div>
      <h2>Ver Datos</h2>
      <ul>
        {data.map((item, index) => (  
          <li key={index}>{item.category}/{item.nameForm}/{item.questions}/{item.summary}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewData;
