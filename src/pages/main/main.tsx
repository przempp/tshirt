import CreateTshirtDirectoryNew from "./components/createTshirtDirectory";

function Main() {
  let table = CreateTshirtDirectoryNew();
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column ">
        <div className="menu menu-directory row justify-content-center">
          {table}
        </div>
      </div>
    </div>
  );
}

export default Main;
