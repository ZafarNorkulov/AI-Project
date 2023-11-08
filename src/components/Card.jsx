import { Badge, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import alanBtn from "@alan-ai/alan-sdk-web";

const Card = () => {
  const [mainCart, setMainCart] = useState([]);
  const [card, setCard] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addCardHandler = (data) => {
    setCard([...card, data]);
    toast.success("Product added succesfully");
  };

  // Alan
  useEffect(() => {
    alanBtn({
      key: import.meta.env.VITE_ALAN_API_KEY,
      onCommand: (commandData) => {
        if (commandData.command === "getMenu") {
          setMainCart(commandData.data);
        } else if (commandData.command === "showCard") {
          addCardHandler(commandData.data);
        } else if (commandData.command === "openCard") {
          setIsModalOpen(commandData.data);
        } else if (commandData.command === "closeCard") {
          setIsModalOpen(commandData.data);
        }
      },
    });
  }, []);

  return (
    <div className="py-6">
      <div className="max-w-[1340px] px-5 mx-auto">
        <Badge size="small" styles={{ border: "none" }} showZero count={card.length}>
          <Button onClick={() => setIsModalOpen(true)}>Card</Button>
        </Badge>
        <div className="grid grid-cols-12 gap-4">
          {mainCart?.map((item, index) => (
            <div key={index} className="relative lg:col-span-4 sm:col-span-6 col-span-12 shadow-md p-3 min-h-[550px] flex flex-col justify-between">
              <div className="card-header">
                <h4 className="w-max mx-auto">Product #{item?.id}</h4>
                <img src={item?.images[0]} alt={item?.title} className="w-full h-[400px] bg-transparent" />
              </div>
              <div className="card-body flex flex-col gap-y-3">
                <h5 className="text-lg font-bold">{item?.title}</h5>
                <p className="text-sm text-gray-500">{item?.description}</p>
              </div>
              <hr className="my-3" />
              <div className="card-footer  flex items-center justify-between">
                <div>
                  <span>{item?.category?.name}</span>
                </div>
                <span>{item?.price}$</span>
              </div>
              <div className="">
                <Button
                  id={item.id}
                  size="large"
                  onClick={() => addCardHandler(item)}
                  className="block font-bold w-full border-2 border-[#45A3FC] hover:bg-[#45A3FC]"
                >
                  Add Card
                </Button>
              </div>
            </div>
          ))}
          <Modal open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
            <div className="grid grid-cols-12 gap-4">
              {card.map((item) => (
                <>
                  <div className="md:col-span-4" key={item?.id}>
                    <img src={item?.images[0]} alt="" />
                  </div>
                  <div className="md:col-span-8">
                    <div className="card-body">
                      <h5 className="text-lg font-bold">{item?.title}</h5>
                      <p className="text-sm text-gray-500">{item?.description}</p>
                      <span>{item?.price}$</span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Card;
