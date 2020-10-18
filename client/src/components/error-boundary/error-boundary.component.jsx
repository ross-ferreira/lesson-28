import React from 'react'

import {ErrorImageOverlay, ErrorImageContainer, ErrorImageText} from './error-boundary.styles'

class ErrorBoundary extends React.Component{
    // in order for react to know this is an error boundary class, you need to use these lifeycle methods

    constructor(){
        super()
        this.state={
            hasErrored:false
        }
    }

    //Lifecycle Method
    static getDerivedStateFromError(error){
        //process Error
        return {
            hasErrored:true
        }
    }

    componentDidCatch(error,info){
        console.log(error)
    }

    render(){
        if(this.state.hasErrored){
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl={'https://i.imgur.com/hkRuanu.png'}/>
                    <ErrorImageText>Sorry, this page is broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary