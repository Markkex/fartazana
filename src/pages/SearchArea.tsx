import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SearchArea = () => {
  const [area, setArea] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (area === "") {
      toast.error("You need to chose your area for your order");
    } else {
      navigate(`/explore/${area}`);
    }
  };

  const onChange = (e: any) => {
    setArea(e.target.value);
  };

  return (
    <div className="search-area">
      <div className="bold-text">Faça o seu pedido conosco!</div>
      <div className="form-search-area">
        <form onSubmit={onSubmit}>
          <input
            placeholder="Escolha a sua área de residência"
            className="input-text padding-3"
            value={area}
            onChange={onChange}
          />

          <button type="submit">Procurar</button>
        </form>
      </div>
    </div>
  );
};

export default SearchArea;
