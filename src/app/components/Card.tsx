import Button from './Button';

const Card = () => {
  return (
    <>
      <div className="w-60 rounded-lg bg-white p-4 shadow-md">
        <div>
          <img
            src="./assets/produtos/ball.png"
            width={20}
            height={20}
            alt="Bola"
            className="h-auto w-full"
          />
        </div>
        <div className="mb-2 flex items-center justify-center">
          <h3>Bola</h3>
        </div>
        <div className="flex items-center justify-center text-gray-600">
          <span>bola colorida para muitas diversões</span>
        </div>
        <Button className="mt-4" variant="primary">
          Adicionar
        </Button>
      </div>

      <div>
        <div className="w-60 rounded-lg bg-white p-4 shadow-md">
          <img
            src="./assets/produtos/tenis.png"
            width={20}
            height={20}
            alt="Tênis"
            className="h-auto w-fit"
          />
        </div>
        <div className="mb-2 flex items-center justify-center">
          <h3>Tênis</h3>
        </div>
        <div className="flex items-center justify-center text-gray-600">
          <span>tênis colorido para diversas ocasiões</span>
        </div>
        <Button className="mt-4" variant="primary">
          Adicionar
        </Button>
      </div>
    </>
  );
};

export default Card;
