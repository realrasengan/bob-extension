import React, {ReactElement, useEffect, useState} from "react";
import "./popup.scss";
import Onboarding from "@src/ui/pages/Onboarding";
import {useDispatch} from "react-redux";
import {
  fetchWallets,
  fetchWalletState,
  useInitialized,
  useWalletState
} from "@src/ui/ducks/wallet";
import AppHeader from "@src/ui/components/AppHeader";
import Login from "@src/ui/pages/Login";
import {Redirect, Route, Switch} from "react-router";
import BobMoveIcon from "@src/static/icons/bob-moves.gif";
import Icon from "@src/ui/components/Icon";

export default function Popup (): ReactElement {
  const dispatch = useDispatch();
  const initialized = useInitialized();
  const { locked } = useWalletState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const now = Date.now();
      await dispatch(fetchWallets());
      await dispatch(fetchWalletState());
      await new Promise(r => setTimeout(r, Math.min(1000, 1000 - (Date.now() - now))));
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="popup__loading">
        <Icon url={BobMoveIcon} size={4} />
        <small>Initializing...</small>
      </div>
    );
  }

  return (
    <div className="popup">
      { !initialized && <Onboarding /> }
      { initialized && <AppHeader />}
      { initialized && locked && (
        <Switch>
          <Route path="/onboarding">
            <Onboarding />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      )}
      { initialized && !locked && (
        <Switch>
          <Route path="/onboarding">
            <Onboarding />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </div>
  )
};