import axios from "axios";
import { useEffect, useState } from "react";
import AdressType from "../types/Adress";
import PageData from "../types/Page";
import getPageData from "../functions/getPageData";
import ContactType from "../types/Contact";
import ScheduleType from "../types/Schedule";
import Schedule from "../components/Schedule";

const Contact = () => {
  const [adresses, setAdresses] = useState<AdressType[] | null>(null);
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [contacts, setContacts] = useState<ContactType[] | null>(null);
  const [schedules, setSchedules] = useState<ScheduleType[] | null>(null);

  const getAdress = () => {
    axios
      .get("https://restaurant-page-eanp.onrender.com/api/adresses")
      .then((response) => {
        setAdresses(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getContacts = () => {
    axios
      .get("https://restaurant-page-eanp.onrender.com/api/contacts")
      .then((response) => {
        setContacts(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getSchedules = () => {
    axios
      .get("https://restaurant-page-eanp.onrender.com/api/contacts/schedules")
      .then((response) => {
        setSchedules(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPageData("contact");
      setPageData(data);
    };

    fetchData();
    getAdress();
    getContacts();
    getSchedules();
  }, []);

  const contactsList = contacts?.map((contact) => {
    let link = contact.value;

    if (contact.type === "email") {
      link = `mailto:${contact.value}`;
    }

    if (contact.type === "phone") {
      link = `tel:${contact.value}`;
    }

    return (
      <div key={contact._id}>
        <a href={link}>{contact.value}</a>
      </div>
    );
  });

  return (
    <main className="min-h-screen flex flex-col items-center pb-24 text-lg p-5 gap-12">
      <h1 className="uppercase text-4xl my-5 text-orange-400 ">contact</h1>
      <div>
        <h1 className="uppercase text-2xl my-5 text-orange-400 text-center">
          {pageData?.section1Title}
        </h1>
        <div className="flex gap-5 flex-wrap">
          {adresses?.map((adress) => (
            <div key={adress._id}>
              <h2>{adress.name}</h2>
              <p>{adress.street}</p>
              <p>{adress.city}</p>
              <p>{adress.postalCode}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="uppercase text-2xl my-5 text-orange-400 text-center">
          {pageData?.section2Title}
        </h1>
        {contactsList}
      </div>
      <div className="w-full max-w-[800px]">
        <h1 className="uppercase text-2xl my-5 text-orange-400 text-center">
          {pageData?.section3Title}
        </h1>
        {schedules?.map((schedule) => (
          <Schedule key={schedule._id} schedule={schedule} />
        ))}
      </div>
    </main>
  );
};

export default Contact;
