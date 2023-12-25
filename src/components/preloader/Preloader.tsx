// import preloader from '../../assets/preloader.svg'
import './PreloaderStyles.scss'

// export const Preloader = () => {
//     return <div className='preloader_wrapper'><img src={preloader} alt={'loading'}/></div>
// }

export const Preloader = () => {
    return <div className='preloader_wrapper'>
        <svg className='svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect fill='#C234C2' stroke='#C234C2' stroke-width='15' width='30' height='30' x='25' y='85'><animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.4'></animate></rect><rect fill='#C234C2' stroke='#C234C2' stroke-width='15' width='30' height='30' x='85' y='85'><animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.2'></animate></rect><rect fill='#C234C2' stroke='#C234C2' stroke-width='15' width='30' height='30' x='145' y='85'><animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='0'></animate></rect></svg>
    </div>
}