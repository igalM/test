import React, { useState, useEffect, useCallback } from 'react';
import WrapperComponent from '../WrapperComponent/WrapperComponent';
import styles from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions';

const Layout = ({ children }) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const dispatch = useDispatch();
    const onInitIngredients = useCallback(() => dispatch(actionCreators.fetchIngredients()), [dispatch]);

    const isAuthenticated = useSelector(state => state.authReducer.token !== null);

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const sideDrawerClosedHandler = () => setShowSideDrawer(false);
    const openSideDrawerHandler = () => setShowSideDrawer(!showSideDrawer);

    return (
        <WrapperComponent>
            <Toolbar
                isAuthenticated={isAuthenticated}
                openSideDrawer={openSideDrawerHandler} />
            <SideDrawer
                isAuthenticated={isAuthenticated}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
            />
            <main className={styles.content}>
                {children}
            </main>
        </WrapperComponent>
    );
}

export default Layout;
