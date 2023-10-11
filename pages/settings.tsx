import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

type Basket = {
  _id: string;
  imageUrl: string;
  name: string;
  type: string;
  price: number;
};

type SettingsType = {
  _id: string;
  heroTitle: string;
  giftBasketsGallery: Basket[];
};

export default function Settings() {
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [baskets, setBaskets] = useState<Basket[] | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9090/settings/find");
      setSettings(response.data.settings);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBasketData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/gift-basket/settings-baskets"
      );

      setBaskets(response.data.baskets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBasketData();
  }, []);

  const setSettingsHero = (newHeroTitle: string) => {
    setSettings((prevSettings: any) => ({
      ...prevSettings,
      heroTitle: newHeroTitle,
    }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    item: any
  ) => {
    const selectedItem = e.target.value;
    const selectedBasket = baskets?.find(
      (basket) => basket.name === selectedItem
    );

    if (selectedBasket) {
      setSettings((prevSettings) => ({
        ...prevSettings!,
        giftBasketsGallery: prevSettings!.giftBasketsGallery.map((basket) =>
          basket._id === item._id ? selectedBasket : basket
        ),
      }));
    }
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
            <div>
              {settings?.giftBasketsGallery.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-1 my-4 border"
                  >
                    <div className="flex items-center space-x-8">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <p>{item.name}</p>
                    </div>
                    <select
                      name="dance"
                      id="dance"
                      value={item._id}
                      onChange={(e) => handleSelectChange(e, item)}
                    >
                      <option value={item._id}>{item.name}</option>
                      {baskets?.map((basket: any) => (
                        <option key={basket._id} value={basket.name}>
                          {basket.name}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
