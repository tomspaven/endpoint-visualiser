import React, {Component} from 'react';

export class CountTable extends Component {
    // Props inc, direction, messageType, x, y
    state = {
        entries: new Map() // String->Array(int, int).  Message Type->[InCount, OutCount]
    }

    render() {
        const tableEntryIncrementer = (value, idx) => {
            const inIdx = 0
            const outIdx = 1
            (this.props.direction === "in" && idx === inIdx) || (this.props.direction === "out" && idx === outIdx) ?
                    value += this.props.inc : 
                    null
        }

        let values = [0, 0]
        if (this.state.entries.has(this.props.messageType)) {
            values = this.state.entries.get(messageType).map(tableEntryIncrementer)
        }
        else {
            values.map(tableEntryIncrementer)
        }

        this.setState({
            entries: entries.set(this.props.messageType, values)
        })

        const yOffsetTopTable = 100
        const tableRows = Array.from(this.state.entries).map([k, v], i => {
            return <text x={this.props.x} y={this.props.y + yOffsetTopTable + i*16}>{k} {v[0]} {v[1]}}</text>
        })
           
        return (
            <div id={"EntryTable" + this.props.epid}>
                 {tableRows}
            </div>
        )
    }
}
