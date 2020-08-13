import React from 'react';
import xo from 'exograph';

export default () => (
    <div className="flex column padded items">

        <xo.GraphNode 
            menuItem
            id="row"
            name="Row" 
            allowDrag={false}
            allowDrop={true} 
            placeholder={<RowLayout />}
            render={(props, ref) => {
                const { data, graphContext, parent, siblings, children, datasources, scope, setData, className, ...other } = props;
                const classes = [];
                if (siblings === 0) classes.push('fill'); 
                if (siblings > 0) classes.push('grow'); 
                return (
                    <div 
                    ref={ref} 
                    className={`flex row container row-container ${className} ${classes.join(' ')}`} 
                    {...other}>
                        { props.children.length===0 && <Watermark><div className="fill flex cell"><h3>Row Layout Container</h3></div></Watermark>}
                        { props.children }
                    </div> 
                )
            }} 
            meta={{
                type: 'container.row',
                accept: ['container'],
                reject: ['container.row'],
            }}
        />

        <xo.GraphNode 
            menuItem
            id="column" 
            name="Column" 
            allowDrag={false} 
            allowDrop={true} 
            placeholder={<ColLayout />}
            render={(props, ref) => {
                const { data, graphContext, parent, siblings, children, datasources, scope, setData, className, ...other } = props;
                const classes = [];
                if (siblings === 0) classes.push('fill'); 
                if (siblings > 0) classes.push('grow'); 
                return (
                    <div 
                    ref={ref} 
                    className={`flex column container column-container ${className} ${classes.join(' ')}`} 
                    {...other}>
                        { props.children.length===0 && <Watermark><div className="fill flex cell"><h3>Column Layout Container</h3></div></Watermark>}
                        { props.children }
                    </div> 
                )
            }} 
            meta={{
                type: 'container.column',
                accept: ['container'],
                reject: ['container.column'],
            }}
        />

        <xo.GraphNode 
            menuItem 
            id="cell"
            name="TightContainer" 
            allowDrag={false} 
            allowDrop={true} 
            placeholder={<TightLayout />}
            render={(props, ref) => {
                const { data, graphContext, parent, siblings, children, datasources, scope, setData, className, ...other } = props;
                const classes = [];
                return (
                    <div 
                    ref={ref} 
                    className={`relative flex row container tight-container ${className} ${classes.join(' ')}`} 
                    {...other}>
                        { props.children.length===0 && <Watermark><div className="fill flex cell"><h3>Cell</h3></div></Watermark>}
                        { props.children }
                    </div> 
                )
            }} 
            meta={{
                type: 'container.widget.tight',
                accept: ['container', 'widget', 'data.source'],
                reject: ['container.widget'],
                maxChildren: 1,
            }}
        />

        <xo.GraphNode 
            menuItem 
            id="expandingcell"
            name="GrowthContainer" 
            allowDrag={false} 
            allowDrop={true} 
            placeholder={<GrowthLayout />}
            render={(props, ref) => {
                const { data, graphContext, parent, siblings, children, datasources, scope, setData, className, ...other } = props;
                const classes = [];
                if (siblings === 0) classes.push('fill'); 
                if (siblings > 0) classes.push('grow'); 
                return (
                    <div 
                    ref={ref} 
                    className={`relative flex row container growth-container ${className} ${classes.join(' ')}`} 
                    {...other}>
                        { props.children.length===0 && <Watermark><div className="fill flex cell"><h3>Expanding Cell</h3></div></Watermark>}
                        { props.children }
                    </div> 
                )
            }} 
            meta={{
                type: 'container.widget.growth',
                accept: ['container', 'widget', 'data.source'],
                reject: ['container.widget'],
                maxChildren: 1,
            }}
        />

    </div>
)

const RowLayout = (props) => {
    return <div className="relative placeholder"> 
        <div className="fill flex row border spaced" style={{padding: '5px'}}>
            <div className="grow align-self-stretch solid"></div>
            <div className="grow align-self-stretch solid"></div>
            
            
        </div>
    </div>
}

const ColLayout = (props) => {
    return <div className="relative placeholder"> 
        <div className="fill flex column border spaced" style={{padding: '5px'}}>
            <div className="grow align-self-stretch solid"></div>
            <div className="grow align-self-stretch solid"></div>
        </div>
    </div>
}

const TightLayout = (props) => {
    return <div className="relative placeholder"> 
        <div className="fill border" style={{padding: '5px'}}>
            <div className="solid absolute" style={{width: "50%", height: "50%"}}> 
            </div>
        </div>
    </div>
}

const GrowthLayout = (props) => {
    return <div className="relative placeholder"> 
        <div className="fill flex border column" style={{padding: '5px'}}>
            <div className="flex grow"> 
                <div className="grow align self stretch solid"></div>
                <div className="align-self-stretch flex" style={{fontSize: '2rem'}}>
                    &#8674;
                </div>
            </div>
            <div className="flex">
                <div className="align-self-stretch flex align-center" style={{fontSize: '2rem', lineHeight: 1}}>
                    &#8675;
                </div>
            </div>
        </div>
    </div>
}

const Watermark = (props) => {
    return <div className="watermark">
        {props.children}
    </div>
}