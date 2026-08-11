const Card = () => {
  return (
    <div className="w-60 rounded-lg bg-white p-4 shadow-md">
      <div>
        <img
          src="./assets/produtos/ball.png"
          width={50}
          height={50}
          alt="Bola"
          className="h-auto w-full"
        />
      </div>
      <div>
        <h3 className="mb-2 text-lg font-bold">Bola</h3>
      </div>
      <div>
        <span className="text-gray-600">
          bola colorida para muitas diversões
        </span>
      </div>

      <div>
        <img
          src="./assets/produtos/tenis.png"
          width={50}
          height={50}
          alt="Tênis"
          className="h-auto w-full"
        />
      </div>
      <div>
        <h3 className="mb-2 text-lg font-bold">Tênis</h3>
      </div>
      <div>
        <span className="text-gray-600">
          tênis colorido para diversas ocasiões
        </span>
      </div>
    </div>
  );
};

export default Card;
