import React from 'react';

interface IContext {

}

const Context = React.createContext({} as IContext);

interface IProps extends React.PropsWithChildren {

}

function GlobalStorage({ children }: IProps) {
    return (
        <Context.Provider value={{}}>{ children }</Context.Provider>
    )
}

export default GlobalStorage;