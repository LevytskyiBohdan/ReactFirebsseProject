import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import '../css/about.css';

class About extends React.Component {
    render() {
        return (<>
            <div className="container-fluid about">
                <div className="row">
                    <div className="col-12 top"></div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h1>My coolest blog</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2575.119156264436!2d24.000040015708052!3d49.802627479391326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae7bead4b2d0f%3A0x21340eeaad1e18d8!2sOptima%20Plaza%2C%20Naukova%20Street%2C%207%D0%91%2C%20L&#39;viv%2C%20L&#39;vivs&#39;ka%20oblast%2C%2079000!5e0!3m2!1sen!2sua!4v1582016776103!5m2!1sen!2sua" 
                        style={{width:"100%", height:"450px", frameborder:"0", border: "0"}} allowFullScreen={true}
                        className="mt-4 mb-5"
                        ></iframe>

                    </div>
                </div>
            </div>
        </>)
    }
}

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));