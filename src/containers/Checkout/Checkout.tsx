import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import Burger from '../../components/Burger/Burger';
import styles from './Checkout.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { InputField } from '../../components/UI/Input/Input';
import { SelectField } from '../../components/UI/Select/Select';
import { CustomButton } from '../../components/UI/Button/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionsCreators from '../../store/actions';
import { RootState } from '../../store/reducers';
import { Order } from '../../types';

const Checkout: React.FC<RouteComponentProps> = ({ history }) => {
    const ingredients = useSelector((state: RootState) => state.ingredientsReducer.ingredients);
    const purchased = useSelector((state: RootState) => state.ordersReducer.purchased);
    const totalPrice = useSelector((state: RootState) => state.ingredientsReducer.totalPrice);
    const loading = useSelector((state: RootState) => state.ordersReducer.loading);
    const token = useSelector((state: RootState) => state.authReducer.token);
    const userId = useSelector((state: RootState) => state.authReducer.userId);

    const dispatch = useDispatch();

    const onOrderBurger = (order: Order, token: string) => dispatch(actionsCreators.purchaseBurger(order, token))


    const cancelOrder = () => history.push('/');

    let orderSummary = <Redirect to="/" />;
    if (ingredients) {
        const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
        orderSummary = (
            <div className={styles.Burger}>
                {purchasedRedirect}
                <h1>We hope it tastes well!</h1>
                <Burger ingredients={ingredients} />
            </div>
        );
    }

    const deliveryMethods = [
        { value: 'fastest', displayName: 'Fastest' },
        { value: 'cheapest', displayName: 'Cheapest' }
    ];
    const values = { name: '', street: '', zipCode: '', country: '', email: '', deliveryMethod: 'fastest' };
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Required'),
        street: Yup.string()
            .required('Required'),
        zipCode: Yup.string()
            .required('Required'),
        country: Yup.string()
            .required('Required'),
        email: Yup.string()
            .email('Must be a valid email')
            .required('Required'),
        deliveryMethod: Yup.string()
            .required('Required')
    });

    let form = <div className={styles.ContactData}>
        <h4 className={styles.Title}>Enter your contact data</h4>
        <Formik
            onSubmit={(values) => {
                if (userId && token) {
                    const order: Order = {
                        ingredients: ingredients,
                        price: totalPrice,
                        date: new Date().toLocaleDateString('en-GB'),
                        userId: userId,
                        userInfo: values
                    };
                    onOrderBurger(order, token);
                }
            }}
            initialValues={values}
            validationSchema={validationSchema}>
            <Form>
                <InputField formikKey="name" label="Your Name" />
                <InputField formikKey="street" label="Your Street" />
                <InputField formikKey="zipCode" label="ZIP Code" />
                <InputField formikKey="country" label="Country" />
                <InputField formikKey="email" label="Your Email" />
                <SelectField formikKey="deliveryMethod" options={deliveryMethods} />
                <CustomButton type="submit" className="success">ORDER</CustomButton>
            </Form>
        </Formik>
        <div className={styles.CancelButton}>
            <CustomButton type="submit" className="danger" onClick={cancelOrder}>CANCEL</CustomButton>
        </div>
    </div>

    if (loading) {
        form = <Spinner />
    }

    return (
        <div className={styles.Checkout}>
            {orderSummary}
            {form}
        </div>
    );
}

export default Checkout;