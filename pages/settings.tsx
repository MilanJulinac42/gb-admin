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
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9090/settings/find");
      setSettings(response.data.settings);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setSettingsHero = (newHeroTitle: string) => {
    setSettings((prevSettings: any) => ({
      ...prevSettings,
      heroTitle: newHeroTitle,
    }));
  };

  return (
    <Layout>
      <h1>Settings page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <label htmlFor="heroTitle">Basket name</label>
          <input
            name="heroTitle"
            id="heroTitle"
            type="text"
            placeholder="enter hero title"
            value={settings?.heroTitle}
            onChange={(e) => setSettingsHero(e.target.value)}
          />
          <label htmlFor="name">Basket image gallery</label>
          <div>
            <p>Choose baskets to display in image gallery</p>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}
