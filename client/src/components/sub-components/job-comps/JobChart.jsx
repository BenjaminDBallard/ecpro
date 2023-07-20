import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';

export function JobChart(props) {

console.log(props)

    let material = props.materialTotal
    let materialMarkup = props.materialMarkupTotal
    

    return (
        <div>
            <PieChart style={{ width: '200px' }}
                data={[
                    { title: 'Material', value: material, color: '#C13C37' },
                    { title: 'Material Mark-up', value: materialMarkup, color: '#E38627' },
                ]}
                label
                labelStyle={{
                    fill: 'white',
                    fontSize: 'small'
                }}
            />
            <h6>Horsepower: &nbsp;
            <span style={{background: '#C13C37'}}>
                &nbsp;
                &nbsp;
                &nbsp;
            </span>
            &nbsp;
            <span>Over 200</span>
            &nbsp;
            <span style={{background: '#E38627'}}>
                &nbsp;
                &nbsp;
                &nbsp;
            </span>
            &nbsp;
            <span>Under 200</span>
            </h6>
        </div>
    )
}
