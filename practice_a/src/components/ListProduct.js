import { useEffect, useState } from "react"
import { deleteProductById, getListProduct, getListProductAndSordByAmount, getListProductByNameAndType, getListTypeProduct } from "../service/Service";
import { useNavigate } from "react-router-dom";
import '../css/list.css';
import ReactModal from "react-modal";


export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState([]);
    const navigate = useNavigate();
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [product, setProduct] = useState({});
    const [modal, setModal] = useState(false);

    useEffect(() => {
        getTypes();
        getProducts();
    }, [])

    const getProducts = async () => {
        const res = await getListProductAndSordByAmount();
        setProducts((pre) => res);
    }

    const getTypes = async () => {
        const res = await getListTypeProduct();
        setTypes((pre) => res);
    }

    const toEdit = (id) => {
        navigate('/product/edit/' + id);
    }

    const search = async () => {
        const res = await getListProductByNameAndType(name, type);
        setProducts((pre) => res);
    }

    const openDeleteModal = (e) => {
        setProduct((pre) => e);
        setModal(true);
    }

    const deleteProduct = async () => {
        await deleteProductById(product.id);
        getProducts();
        setModal(false);
    }

    return (
        <>
            <h1>{product.id}</h1>

            <div className="container-lg">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-8"><h2><b>LIST PRODUCT</b> </h2></div>

                            </div>
                        </div>
                        <label htmlFor="searchName" >Name</label>
                        <input name="searchName" onChange={(event) => setName((pre) => event.target.value)} />

                        <select id='type' onChange={(event) => setType((pre) => event.target.value)}>
                            <option value=""  >Find by type</option>
                            {types.map((element) => (
                                <option value={element.name}>{element.name}</option>
                            ))}
                        </select>

                        <button onClick={() => search()}>Find</button>


                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Date input</td>
                                    <td>Amount</td>
                                    <td>Type product</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.name}</td>
                                        <td>{p.date}</td>
                                        <td>{p.amount}</td>
                                        <td>{p.types.name}</td>
                                        <td>
                                            <button onClick={() => toEdit(p.id)} >Edit</button>
                                            <button onClick={() => openDeleteModal(p)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ReactModal isOpen={modal}>
                <p>Do you want to delete {product.name}</p>
                <button onClick={() => deleteProduct()}>Yes</button>
                <button onClick={() => setModal(false)}>No</button>
            </ReactModal>
        </>
    )
}