import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

type basket = {
  basketId: string;
  name: string;
  type: string;
  price: number;
};

type SettingsType = {
  _id: string;
  heroTitle: string;
  giftBasketsGallery: basket[];
};

export default function Settings() {
  const [settings, setSettings] = useState<SettingsType[]>([]);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9090/settings/find");

      console.log(response.data);

      setSettings(response.data.settings.settings);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <h1>Settings page</h1>
      {isLoading ? <p>Loading...</p> : <div>
	  <label htmlFor="name">Basket name</label>
				<input
					name="name"
					id="name"
					type="text"
					placeholder="basket name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
		</div>}
    </Layout>
  );
}
