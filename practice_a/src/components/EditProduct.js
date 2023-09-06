import { useNavigate, useParams } from "react-router-dom"
import { editProduct, getListTypeProduct, getProductById } from "../service/Service";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/form.css';

export default function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [types, setTypes] = useState([]);
    const [type, setType] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        getProduct();
        getTypes();
    }, []);

    const getProduct = async () => {
        const res = await getProductById(id);
        setProduct((pre) => res);
        setType((pre) => res.types);
    }

    const getTypes = async () => {
        const res = await getListTypeProduct();
        setTypes((pre) => res);
    }

    const toList = () => {
        navigate('/product');
    }

    const edit = async (product) => {
        product.types = type;
        await editProduct(product);
        navigate('/product');
    }

    const changeType = (name) => {
        types.forEach((e) => {
            if (e.name === name) {
                setType((pre) => e);
            }
        })
    }


    if (product === null || type === null) {
        return;
    }

    return (
        <>
            <h1>{type.name}</h1>

            <div class="container-lg">
                <div class="row">
                    <div class="col-md-10 mx-auto">
                        <div class="contact-form">
                            <h1>Edit product</h1>
                            <ToastContainer />


                            <button onClick={() => toList()} >Back to list</button>
                            <Formik
                                initialValues={{
                                    id: id,
                                    name: product.name,
                                    date: product.date,
                                    amount: product.amount,
                                    type: product.types.name
                                }}

                                validationSchema={yup.object({
                                    name: yup.string().max(100, 'too long').min(5, 'too short'),
                                    amount: yup.number('amount must be a number').min(0, 'cant be < 0'),


                                })}



                                onSubmit={(value) => {

                                    edit(value)
                                }}
                            >
                                <Form>
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <Field name="name" />
                                        <ErrorMessage name="name" />
                                    </div>

                                    <div>
                                        <label htmlFor="date">Date input</label>
                                        <Field name="date" />
                                        <ErrorMessage name="date" />
                                    </div>

                                    <div>
                                        <label htmlFor="amount">Amount</label>
                                        <Field type="number" name="amount" />
                                        <ErrorMessage name="amount" />
                                    </div>

                                    <div>
                                        <label htmlFor="type">Choose type</label>
                                        <Field name="type" as="select" onClick={(event) => changeType(event.target.value)}>
                                            {types.map((element) => (
                                                <option value={element.name} >{element.name}</option>
                                            ))}
                                        </Field>
                                    </div>
                                    <button type="submit">Edit</button>

                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}