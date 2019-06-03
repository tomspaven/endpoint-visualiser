import React, { Component } from 'react'
import { TweenLite, TimelineLite, Power1 } from 'gsap'

export const PipeWidth = () => { return 19 }
export const PipeHeight = () => { return 60 }

/*const AnimatedChar = posed.text({
    bottom: {
        opacity: 1,
        y: (props) => props.startY
    },
    top: {
        opacity: 1,
        y: (props) => props.endY,
        transition: {duration: 1000}
    },
    disappear: {
        opacity: 0,
    }
})*/

export class Pipe extends Component {
    //transition: {duration: 300}
    state = {
        done: false,
        goodbye: false,
        char: '',
        pipe: null,
        pipeTween: null,
    }

    /*componentWillReceiveProps(newProps, oldState) {
        if(newProps.animCharacter !== oldState.char) {
            this.setState({
                done: false,
                goodbye: false,
                char: newProps.animCharacter,
            })
    
            const doneTimer = () => {
                this.setState({done: true})
                const disappearTimer = () => {
                    this.setState({goodbye: true})
                }
                setTimeout(disappearTimer, 1000)
            }
            setTimeout(doneTimer, 1)
        }
    }*/

    shouldComponentUpdate(newProps, nextState) {
        console.log("State Char: " + this.state.char + " , props char: " + newProps.animCharacter)
        if (this.state.char !== newProps.animCharacter) {
            console.log(newProps.id + "RENDERING")
            return true
        }
        console.log(newProps.id + "Not RENDERING YEAH!")
        return false
    }

    componentWillReceiveProps(newProps, oldState) {
        if (newProps.animCharacter !== "" &&
            newProps.animCharacter !== oldState.char) {

            let charXOffset = 30
            const charYOffset = 225, outAdditionalXOffset = 120

            let startY = this.props.y + charYOffset
            const pipeHeight = 50
            let endY = startY - pipeHeight

            if (this.props.isOut) {
                charXOffset += outAdditionalXOffset
                let tmp = startY
                startY = endY
                endY = tmp
            }
            const startX = this.props.x + charXOffset


            const animationTimeSeconds = 0.3
            const fadeOutSeconds = 0.1

            const animation = new TimelineLite()
            animation.fromTo(this.state.pipe, animationTimeSeconds, {
                    opacity: 1,
                    x: startX,
                    y: startY,
                }, {
                    opacity: 1,
                    x: startX,
                    y: endY,
                })
                .to(this.state.pipe, fadeOutSeconds, {
                    opacity: 0,
                    ease: Power1.easeInOut,
                })

            this.setState({
                pipeTween: animation.play()
            })

            // Set a timer to reset the character state to empty so the 
            // compoment can use this to determine whether to rerender
            // or not
            setTimeout(() => { this.setState({ char: '' }) }, animationTimeSeconds)

        }
    }

    render() {
        this.setState({
            char: this.props.animCharacter,
        })

        return (
            //<text style={{fill: 'black', fontSize: 16}} ref={text => this.state.pipe = text}>{this.props.animCharacter}</text> 
            <text style={{ fill: 'black', fontSize: 16 }} ref={text => this.setState({ pipe: text })}>{this.props.animCharacter}</text>
        )
    }

}