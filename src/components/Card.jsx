import { Badge, Button, Empty, Modal } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import alanBtn from "@alan-ai/alan-sdk-web";
import Logo from "../../public/logo.png";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Card = () => {
  const [mainCart, setMainCart] = useState([]);
  const [card, setCard] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [characters, updateCharacters] = useState(mainCart);
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
  function handleDragEnd(res) {
    if (!res.destination) return;
    console.log(res);
    const items = Array.from(characters);
    const [reorderedItems] = items.splice(res.source.index, 1);
    items.splice(res.destination.index, 0, reorderedItems);
    updateCharacters(items);
  }

  return (
    <div className="py-6">
      <div className="max-w-[1340px] px-5 mx-auto">
        <div className="flex  justify-between">
          <img className="w-[120px] " src={Logo} />
          <Badge size="small" styles={{ border: "none" }} showZero count={card.length}>
            <svg
              onClick={() => setIsModalOpen(true)}
              className="w-6 ml-auto cursor-pointer"
              stroke="#f9f9f9"
              fill="#f9f9f9"
              strokeWidth="0"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
            </svg>
          </Badge>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {mainCart?.map((item, index) => (
            <div
              className="relative lg:col-span-4 sm:col-span-6 col-span-12 shadow-md p-3 min-h-[550px] flex flex-col justify-between"
              key={index}
            >
              <div className="card-header">
                <h4 className="w-max mx-auto">Product #{item?.id}</h4>
                <img src={item?.images[1]} alt={item?.title} className="w-full h-[400px] bg-transparent object-cover" />
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
          <Modal
            open={isModalOpen}
            closeIcon={
              <svg
                stroke="#f9f9f9"
                fill="#f9f9f9"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                fillRule="evenodd"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M799.855 166.312c.023.007.043.018.084.059l57.69 57.69c.041.041.052.06.059.084a.118.118 0 0 1 0 .069c-.007.023-.018.042-.059.083L569.926 512l287.703 287.703c.041.04.052.06.059.083a.118.118 0 0 1 0 .07c-.007.022-.018.042-.059.083l-57.69 57.69c-.041.041-.06.052-.084.059a.118.118 0 0 1-.069 0c-.023-.007-.042-.018-.083-.059L512 569.926 224.297 857.629c-.04.041-.06.052-.083.059a.118.118 0 0 1-.07 0c-.022-.007-.042-.018-.083-.059l-57.69-57.69c-.041-.041-.052-.06-.059-.084a.118.118 0 0 1 0-.069c.007-.023.018-.042.059-.083L454.073 512 166.371 224.297c-.041-.04-.052-.06-.059-.083a.118.118 0 0 1 0-.07c.007-.022.018-.042.059-.083l57.69-57.69c.041-.041.06-.052.084-.059a.118.118 0 0 1 .069 0c.023.007.042.018.083.059L512 454.073l287.703-287.702c.04-.041.06-.052.083-.059a.118.118 0 0 1 .07 0Z"></path>
              </svg>
            }
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          >
            <div className="grid grid-cols-12 gap-4 mt-10">
              {card?.length > 0 ? (
                card?.map((item) => (
                  <>
                    <div className="md:col-span-4 col-start-2 col-span-6" key={item?.id}>
                      <img src={item?.images[0]} className="object-cover " alt="" />
                    </div>
                    <div className="md:col-span-8 col-span-10 col-start-2">
                      <div className="card-body">
                        <h5 className="text-lg font-bold text-[#e3e3e3]">{item?.title}</h5>
                        <p className="text-sm text-gray-500">{item?.description}</p>
                        <span className="text-[#e3e3e3]">{item?.price}$</span>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <Empty className="col-span-12 mt-10" />
              )}
            </div>
          </Modal>
        </div>
        {/* </DragDropContext> */}
      </div>
    </div>
  );
};

export default Card;
