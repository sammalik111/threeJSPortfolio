import * as THREE from 'three';
import { CSG } from 'three-csg';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// Global variables
var container;
var camera, cameraTarget, scene, renderer, controls;
var light1, light2;
var mesh, geometry, geometryZero, material;
var PCAdata; 
var plane;
var oldStd, oldSHS, oldStt, oldBMI, oldGen, oldAge;
var isLicenseAgreed = false;
var license ='<div class="myBox" style="text-align: left;"><p><strong>End-User License Agreement</strong></p><p>University of Michigan Office of Technology Transfer File: 2019-247</p><p>IMPORTANT &ndash; READ CAREFULLY: This Agreement is a legal agreement between &ldquo;LICENSEE&rdquo; (defined below) and The Regents of The University of Michigan, a constitutional corporation of the state of Michigan (&ldquo;MICHIGAN&rdquo;).</p><p>BACKGROUND</p><ol><li>Faculty at the University of Michigan have developed a proprietary application and related documentation, referred to as &ldquo;Online Body Shape Models&rdquo;, and further described in MICHIGAN Office of Technology File 2019-247 (hereinafter referred to as "MODEL"); and</li><li>LICENSEE desires to obtain, and MICHIGAN, consistent with its mission of education and research, desires to grant, a license to use the MODEL subject to the terms and conditions set forth below; and</li></ol><p>The parties therefore agree as follows:</p><ol><li>&nbsp;&nbsp; LICENSE</li><li>The term &ldquo;LICENSEE&rdquo; shall mean the person downloading the MODEL solely for personal use by that person on the personal equipment of that person</li><li>Subject to the terms and conditions of this Agreement, MICHIGAN hereby grants to LICENSEE a non-exclusive, non-transferable right to copy, download and use the MODEL solely by LICENSEE for academic, research, and non-commercial purposes.</li><li>LIMITATION OF LICENSE AND RESTRICTIONS</li><li>LICENSEE shall not translate, reverse engineer, decompile, disassemble, modify, create derivative works of or publicly display the MODEL, in whole or in part, unless expressly authorized by this Agreement.</li><li>LICENSEE agrees that it shall use the MODEL only for LICENSEE\'S sole and exclusive use, and shall not disclose, sell, license, or otherwise distribute the MODEL to any third party without the prior written consent of MICHIGAN. LICENSEE shall not assign this Agreement, and any attempt by LICENSEE to assign it shall be void from the beginning. LICENSEE agrees to secure and protect the MODEL and any copies in a manner consistent with the maintenance of MICHIGAN\'S rights in the MODEL and to take appropriate action by instruction or agreement with its employees who are permitted access to the MODEL in order to satisfy LICENSEE\'S obligations under this Agreement.</li><li>LICENSEE agrees that it shall include copyright notice &ldquo;Copyright 2018 The Regents of The University of Michigan &ndash; Biosciences Group UMTRI&rdquo; in all results, publications, presentations or other public displays of results which utilize the MODEL in whole or part.</li></ol><p>III. TITLE AND OWNERSHIP</p><ol><li>No ownership rights of MICHIGAN in the MODEL are conferred upon LICENSEE by this Agreement.</li><li>LICENSEE acknowledges MICHIGAN\'S proprietary rights in the MODEL and agrees to reproduce all copyright notices supplied by MICHIGAN on all copies of the MODEL, and on all MODEL outputs and copies of MODEL outputs.</li><li>DISCLAIMER OF WARRANTY AND LIMITATION OF LIABILITY</li><li>THE<strong> MODEL</strong> IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. <strong>MICHIGAN</strong> DOES NOT WARRANT THAT THE FUNCTIONS CONTAINED IN THE <strong>MODEL</strong> WILL MEET <strong>LICENSEE\'S </strong>REQUIREMENTS OR THAT OPERATION WILL BE UNINTERRUPTED OR ERROR FREE. MICHIGAN shall not be liable for special, indirect, incidental, or consequential damages with respect to any claim on account of or arising from this Agreement or use of the MODEL, even if MICHIGAN has been or is hereafter advised of the possibility of such damages. Because some states do not allow certain exclusions or limitations on implied warranties or of liability for consequential or incidental damages, the above exclusions may not apply to LICENSEE. In no event, however, will MICHIGAN be liable to LICENSEE, under any theory of recovery, in an amount in excess of the license fee paid by LICENSEE under this Agreement.</li><li>LICENSEE agrees that MICHIGAN has no obligation to provide to LICENSEE any maintenance, support, or update services. Should MICHIGAN provide any revised versions of the MODEL to LICENSEE, LICENSEE agrees that this license agreement shall apply to such revised versions.</li><li>The MODEL does not provide medical advice and is not intended as a sole means for patient diagnosis.&nbsp; It is not a substitute for professional medical advice, diagnosis or treatment.&nbsp; The MODEL is intended for informational purposes only.&nbsp; MICHIGAN does not warrant or guarantee the accuracy or completeness of the information in the MODEL and specifically disclaims any liability therefore.</li><li>WARRANTY OF LICENSEE</li></ol><p>LICENSEE warrants and represents that it will carefully review any documentation or instructional material provided by MICHIGAN.</p><ol><li>TERMINATION</li></ol><p>If LICENSEE at any time fails to abide by the terms of this Agreement, MICHIGAN shall have the right to immediately terminate the license granted herein, require the return or destruction of all copies of the MODEL from LICENSEE and certification in writing as to such return or destruction, and pursue any other legal or equitable remedies available.</p><p>VII. MISCELLANEOUS</p><ol><li>This Agreement shall be construed in accordance with the laws of the state of Michigan. Should LICENSEE for any reason bring a claim, demand, or other action against MICHIGAN, its agents or employees, arising out of this Agreement or the MODEL licensed herein, LICENSEE agrees to bring said claim only in the Michigan Court of Claims.</li><li>THIS AGREEMENT REPRESENTS THE COMPLETE AND EXCLUSIVE STATEMENT OF THE AGREEMENT BETWEEN<strong>MICHIGAN</strong> AND <strong>LICENSEE </strong>AND SUPERSEDES ALL PRIOR AGREEMENTS, PROPOSALS, REPRESENTATIONS AND OTHER COMMUNICATIONS, VERBAL OR WRITTEN, BETWEEN THEM WITH RESPECT TO USE OF THE<strong>MODEL</strong>. THIS AGREEMENT MAY BE MODIFIED ONLY WITH THE MUTUAL WRITTEN APPROVAL OF AUTHORIZED REPRESENTATIVES OF THE PARTIES.</li><li>The terms and conditions of this Agreement shall prevail notwithstanding any different, conflicting, or additional terms or conditions which may appear in any purchase order or other document submitted by LICENSEE. LICENSEE agrees that such additional or inconsistent terms are deemed rejected by MICHIGAN.</li><li>Unless otherwise exempt therefrom, LICENSEE agrees that it will be responsible for any sales, use or excise taxes imposed by any governmental unit in this transaction except income taxes.</li><li>LICENSEE acknowledges that the MODEL is of United States origin. LICENSEE agrees to comply with all applicable international and national laws that apply to the MODEL, including the United States Export Administration Regulations, as well as end-user, end-use, and destination restrictions issued by the United States.</li><li>All copies of the MODEL distributed by LICENSEE shall contain copyright notice in appropriate locations and forms.&nbsp; Such notices shall be consistent with any instructions which might be provided by MICHIGAN; and shall include all copyright and other notices in the form supplied by MICHIGAN</li><li>MICHIGAN and LICENSEE agree that any xerographically or electronically reproduced copy of this fully-executed agreement shall have the same legal force and effect as any copy bearing original signatures of the parties.</li></ol><p>&nbsp;</p></div>'
			
var plyMesh;
var objMesh;

var predAnthNum = 28;
var predLandmarkNum = 119;
// Mouse tooltip variables
let raycaster;
let mouse, INTERSECTED;
let cameraOrtho, sceneOrtho;
//End line num of PCA data
var endline = 43666;

// Track bars
var anth = new function() {
    this.STUDY = 1;
    this.GENDER = 1;
    this.STATURE = 1700;
    this.BMI = 26;
    this.SHS = 0.52;
    this.AGE = 40;
    this.LandmarkView = false;
    this.FileType = 'obj';
    this.FileName = 'BioHuman';
    this.ExportGeometry = function(){
        
        if(!CheckLicense()) return;
        


        if(this.FileType == 'stl'){

        ASCIIStlWriter.save(geometry, this.FileName + "_"+ ".stl");
        }
        else if(this.FileType == 'obj')
        {
        var exporter = new THREE.OBJExporter();
        var objreturn = exporter.parse(geometry);
        
        var blob = new Blob([objreturn], {type: 'text/plain'});

        saveAs(blob, this.FileName + "_"+ ".obj");
        }	
        
        var parametervalue = 'p' + this.STUDY.toFixed() + 
            '_' + this.GENDER.toFixed() +
            '_' + this.STATURE.toFixed() +
            '_' + this.BMI.toFixed(1) +
            '_' + this.SHS.toFixed(2) +
            '_' + this.AGE.toFixed();
        /// count download
        gtag('event', 'Model_Download', {
        'event_category' : 'Adult_Seated',
        'event_label' : parametervalue
        });
    };
    this.Landmarks = function(){
        
        if(!CheckLicense()) return;
        
        ASCIILMWriter.save(PCAdata, predAnthNum, predLandmarkNum, 
            this.FileName + "_" + getDateNow()+ "_landmark.csv");
            
        gtag('event', 'Landmarks_Download', {
        'event_category' : 'Adult_Seated'
        });
    };//
    this.BodyDimensions = function(){

        if(!CheckLicense()) return;
        ASCIIAnthroWriter.save(PCAdata, predAnthNum, predLandmarkNum, 
            this.FileName + "_" + getDateNow() + "_anthro.csv");
            
        gtag('event', 'Anthro_Download', {
        'event_category' : 'Adult_Seated'
        });
    };
    this.RandomModel = function()
    {
        if(Math.random()>0.5) this.STUDY = 1;
        else this.STUDY = -1;
        
        if(Math.random()>0.5) this.GENDER = 1;
        else this.GENDER = -1;
        
        this.STATURE = Math.random() * 408 + 1557;
        this.BMI = Math.random() * 22 + 17;
        this.AGE = Math.random() * 75 + 20;
        this.SHS = 0.52;
    };
}
function CheckLicense()
{
    if(isLicenseAgreed) return true;
    
    Swal.fire({
            title: 'End-User License Agreement',
            showCancelButton: true,
            width: '1000px',
            padding: '6em',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            heightAuto: true,
            confirmButtonText: 'Agreed',
            html: license
        }).then((result) => {
        if (result.value) {
            Swal.fire(
            'Agreed!',
            'Please try your download again',
            'success'
            )
                isLicenseAgreed = true;
            }
        });
    
    if(!isLicenseAgreed) return false;	
    else return true;	
}

var gui = new dat.GUI();
gui.width = 350;
gui.add(anth, 'STUDY', { US: 1, JAPAN: -1} ).onChange( function(){
                animate();
                }).name("Study Population").listen();
    
gui.add(anth, 'GENDER', { MALE: 1, FEMALE: -1} ).name("Sex").onChange( function(){
                animate();
                }).listen();
gui.add(anth, 'STATURE',1450,1900).name("Stature (mm)");
gui.add(anth, 'BMI',18,40).name("Body Mass Index (kg/m"+"2".sup()+")");
gui.add(anth, 'SHS', 0.4,0.6).name(" Sitting Height / Stature");
gui.add(anth, 'AGE', 20,90).name("Age (year old)");

gui.add(anth, 'RandomModel').name("Generate Random Model");

var folder2 = gui.addFolder('File Export');
folder2.add(anth, 'FileName').name("Input File Name");
folder2.add(anth, 'FileType', [ 'obj', 'stl'] );
folder2.add(anth, 'ExportGeometry').name("Export Body Shape Model");
folder2.add(anth, 'Landmarks').name("Export Landmarks");
folder2.add(anth, 'BodyDimensions').name("Export Body Dimentions");



var folder3 = gui.addFolder('Visualization Option');
var palette = new function() {
    this.bgColor = [ 255, 255, 255 ];
    this.modelColor =[ 255, 255, 255 ];
    this.showwireframe= false;
    this.reset = function(){
        plane.visible = true;
        renderer.setClearColor( scene.fog.color, 1 );
        material.color.r = 1;
        material.color.g = 1;
        material.color.b = 1;
    };
};
folder3.addColor(palette, 'bgColor').name("Set Background Color")
.onChange(function(e)
{
    plane.visible = false;
    var bgcolor = new THREE.Color( 0x66aacc ) ;
    bgcolor.r = e[0]/255.0;
    bgcolor.g = e[1]/255.0;
    bgcolor.b = e[2]/255.0;
    renderer.setClearColor( bgcolor, 0);
});

folder3.addColor(palette, 'modelColor').name("Set Model Color")
.onChange(function(e)
{
    material.color.r = e[0]/255.0;
    material.color.g = e[1]/255.0;
    material.color.b = e[2]/255.0;
});
folder3.add(palette, 'showwireframe').name("Wireframe View On/Off")
.onChange(function()
{
    material.wireframe = palette.showwireframe;
});
folder3.add(palette, 'reset').name("Reset Visual Option");


// Adjust width of DAT GUI
for(var i=0; i<gui.__controllers.length; i++)
{
    gui.__controllers[i].domElement.style = "width:170px";
}

for(var i=0; i<8; i++)
{
    gui.__ul.children[i].children[0].children[0].style = "width:160px; text-align: left";
}

var ASCIIStlWriter = (function () {
    var that = {};

    var stringifyVector = function(vec){
        return ""+vec.x+" "+vec.y+" "+vec.z;
    }

    var stringifyVertex = function(vec){
        return "      vertex "+vec.x+" "+vec.y+" "+vec.z+" \n";
    }

    // Given a THREE.Geometry, create an STL string
    var generateSTL = function (geometry){
        var vertices = geometry.vertices;
        var tris     = geometry.faces;
        
        // Read version info
        var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","versioninfo.txt",false);
        xmlhttp.send();
        var versionInfo =xmlhttp.responseText;
        
        
        var stl = "solid STL generated by UMTRI. Version:" + versionInfo + "\n";
        for(var i = 0; i<tris.length; i++){
        stl += ("  facet normal "+stringifyVector( tris[i].normal )+" \n");
        stl += ("    outer loop \n");
        stl += stringifyVertex( vertices[ tris[i].a ]);
        stl += stringifyVertex( vertices[ tris[i].b ]);
        stl += stringifyVertex( vertices[ tris[i].c ]);
        stl += ("    endloop \n");
        stl += ("  endfacet \n");
        }
        stl += ("endsolid");

        return stl
    }

    // Use FileSaver.js 'saveAs' function to save the string
    var save = function ( geometry, filename ){  
        var stlString = generateSTL( geometry );

        var blob = new Blob([stlString], {type: 'text/plain'});

        saveAs(blob, filename);

    }

    that.save = save;
    return that;
}());

var ASCIILMWriter = (function () {
    var that = {};

    var save = function ( PCAdata, numAnth, numLm, filename ){  
        
        // update points					
        var Anths = [anth.STUDY, anth.GENDER, anth.STATURE, anth.SHS, anth.BMI, anth.AGE, 1];
                
        // Number of vertices of the model :18271
        var csvString = "";

        for(var i = 0; i<numLm; i++)
        {
        var LmName = PCAdata[endline + numAnth + numLm * 3 + i][0];
        
        var xcoord = Number(PCAdata[endline + numAnth + i*3 +0][0]) + calcCoords(Anths, PCAdata[numAnth + i*3+0]);
        var ycoord = Number(PCAdata[endline + numAnth + i*3+1][0]) + calcCoords(Anths, PCAdata[numAnth + i*3+1]);
        var zcoord = Number(PCAdata[endline + numAnth + i*3+2][0]) + calcCoords(Anths, PCAdata[numAnth + i*3+2]);

        csvString += (LmName+", "+xcoord.toFixed(1)+","+ycoord.toFixed(1)+","+zcoord.toFixed(1)+"\n");
        }
        
        var blob = new Blob([csvString], {type: 'text/plain'});

        saveAs(blob, filename);
    }

    that.save = save;
    return that;

}());

var ASCIIAnthroWriter = (function () {
var that = {};    
var save = function ( PCAdata, numAnth, numLm, filename ){  

    // update points						
    var Anths = [anth.STUDY, anth.GENDER, anth.STATURE, anth.SHS, anth.BMI, anth.AGE, 1];
    var anthNames = [
        'Gender',
        'AgeAtTesting',
        'Stature(w/Shoes)',
        'Stature(w/oShoes)',
        'Weight (kg)',
        'BMI (kg/m^2)',
        'SHS',
        'ErectSittingHeight',
        'EyeHeight',
        'AcromialHeight',
        'KneeHeight',
        'TragionToTopOfHead',
        'HeadLength',
        'HeadBreadth',
        'Shoulder-ElbowLength',
        'Elbow-HandLength',
        'HipBreadth',
        'Buttock-KneeLength',
        'Buttock-PoplitealLength',
        'BiacromialBreadth',
        'ShoulderBreadth',
        'ChestDepth(Scapula)',
        'ChestDepth(Spine)',
        'BiASISBreadth',
        'ChestCircumference',
        'WaistCircumference',
        'HipCircumference',
        'UpperThighCircumference'
    ];
        
    
    // Number of vertices of the model :18271
    var csvString = "";

    for(var i = 0; i<numAnth; i++){
    var anthName = anthNames[i];
    
    var anthPred = Number(PCAdata[endline + i][0]) + calcCoords(Anths, PCAdata[i]);
                                                                                
        csvString += (anthName+","+anthPred.toFixed(2)+"\n");
    }
    
    var blob = new Blob([csvString], {type: 'text/plain'});

    saveAs(blob, filename);
}

that.save = save;
return that;

}());


// Mouse tooltip onDocumentMouseMove
function onDocumentMouseMove( event ) {
    if (anth.LandmarkView) 
    {
        event.preventDefault();

        // Mouse tooltip render function call
        render();
        // Mouse tooltip render function call

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        mouseWindow = new THREE.Vector2(event.clientX - window.innerWidth * 0.435, - event.clientY + window.innerHeight * 0.44);
    }

}
// Mouse tooltip onDocumentMouseMove

// function setShadowedLight( directionalLight ) {

//     directionalLight.castShadow = true;
//     // directionalLight.shadowCameraVisible = true;

//     var d = 3;
//     directionalLight.shadowCameraLeft = -d;
//     directionalLight.shadowCameraRight = d;
//     directionalLight.shadowCameraTop = d;
//     directionalLight.shadowCameraBottom = -d;

//     directionalLight.shadowCameraNear = 0;
//     directionalLight.shadowCameraFar = 6;

//     directionalLight.shadowMapWidth = 4096;
//     directionalLight.shadowMapHeight = 4096;

//     directionalLight.shadowBias = -0.001;
//     directionalLight.shadowDarkness = 0.2;

// }
// from http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
function CSVToArray( strData, strDelimiter ){
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
        "gi"
    );
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec( strData )){
        var strMatchedDelimiter = arrMatches[ 1 ];
        if (
            strMatchedDelimiter.length &&
                (strMatchedDelimiter != strDelimiter)
            ){
        arrData.push( [] );
        }
        if (arrMatches[ 2 ]){
        var strMatchedValue = arrMatches[ 2 ].replace(
            new RegExp( "\"\"", "g" ),
            "\""
        );

        } else {
        var strMatchedValue = arrMatches[ 3 ];
        }
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    return( arrData );
}

function calcCoords(diffAnths, onePCAdata) {
    var diffCoords = 0.0;

    for (let k = 0; k < diffAnths.length; k++) {
        diffCoords += onePCAdata[k] * diffAnths[k];
    }

    return diffCoords;
}

// function CSG2Geom(csg){
//     if(csg.polygons[geometryCachekey]) return csg.polygons[geometryCachekey]

//     const vertices = []
//     const indices  = []
//     let idx = 0

//     const pointAdd = (v) =>{
//         if (v.index === undefined){
//         v.index = idx++
//         vertices.push(v[0], v[1], v[2] || 0)
//         }
//     }

//     for (let poly of csg.polygons){
//         let arr = poly.vertices
//         arr.forEach(pointAdd)
//         let first = arr[0].index
//         for(let i=2; i<arr.length; i++){
//         indices.push(first, arr[i-1].index, arr[i].index)
//         }
//     }
//     const geo = new THREE.BufferGeometry();
//     geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices),3))
//     geo.setIndex(indices)

//     csg.polygons[geometryCachekey] = geo

//     return geo;
// }


function loadPLYFile() {
    const loader = new PLYLoader();
    loader.load('model/mean_model_tri.ply', function (geometry) {
        // Check if geometry needs to be processed as BufferGeometry
        if (geometry.isBufferGeometry) {
            // Process BufferGeometry
            var positions = geometry.attributes.position;
            var geometryZero = [];
            for (let i = 0; i < positions.count; i++) {
                var x = positions.getX(i);
                var y = positions.getY(i);
                var z = positions.getZ(i);
                geometryZero.push(new THREE.Vector3(x, y, z));
            }

            var Anths = [anth.STUDY, anth.GENDER, anth.STATURE, anth.SHS, anth.BMI, anth.AGE, 1];
            var skipNum = predAnthNum + predLandmarkNum * 3;

            for (let i = 0; i < positions.count; i++) {
                var diffx = calcCoords(Anths, PCAdata[skipNum + i * 3 + 0]);
                var diffy = calcCoords(Anths, PCAdata[skipNum + i * 3 + 1]);
                var diffz = calcCoords(Anths, PCAdata[skipNum + i * 3 + 2]);

                positions.setXYZ(
                    i,
                    geometryZero[i].x + diffx,
                    geometryZero[i].y + diffy,
                    geometryZero[i].z + diffz
                );
            }

            positions.needsUpdate = true;
            geometry.computeVertexNormals();
        }

        // Create material and mesh
        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            specular: 0xaaaaaa,
            shininess: 20,
            shading: THREE.SmoothShading
        });

        // Remove the previous PLY mesh if it exists
        if (plyMesh) {
            scene.remove(plyMesh);
        }

        // Create the new mesh and assign it to plyMesh
        plyMesh = new THREE.Mesh(geometry, material);
        plyMesh.rotation.set(-60 * (Math.PI / 180), 0, 90 * (Math.PI / 180));
        plyMesh.position.set(-10, 1.6, -0.3);
        plyMesh.scale.set(0.001, 0.001, 0.001);
        plyMesh.castShadow = true;
        plyMesh.receiveShadow = true;

        // Add the new mesh to the scene
        scene.add(plyMesh);

        document.getElementById('text').style.display = "none"; // Hide loading text
    });
}

// Function to remove the previous OBJ mesh from the scene
function removeObjMesh() {
    if (objMesh) {
        scene.remove(objMesh);
        objMesh.geometry.dispose();
        objMesh.material.dispose();
        objMesh = undefined;
    }
}
// Function to load and add the new OBJ mesh to the scene
function loadAndAddOBJ() {
    const loader = new OBJLoader();
    loader.load('_changes.obj', function (object) {
        // Create a Mesh and add it to your three.js scene
        object.scale.set(0.001, 0.001, 0.001);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });

        // Set the desired rotation and position for the object
        object.rotation.set(-Math.PI / 2, 0, -Math.PI / 2);
        object.position.set(-10.3, 1, -0.5);

        // Add the new OBJ mesh to the scene and remove the old one
        removeObjMesh();
        objMesh = object;
        scene.add(objMesh);
    });
}


// init function
function init(data) {
    
    // save the PCA data as a global variable
    PCAdata = data;
        
    // model position in the scene
    var centerHeight = -0.1;

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( -10, 1.5, 1.0 );


    cameraTarget = new THREE.Vector3( 0, 0, 0 );

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x111111, 2, 15 );

    //Mouse tooltip//
    cameraOrtho = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000 );
    cameraOrtho.position.z = 10;
    sceneOrtho = new THREE.Scene();
    //Mouse tooltip//

    // Ground
    // console.log(THREE);
    plane = new THREE.Mesh(
        // new THREE.PlaneBufferGeometry( 40, 40 ),
        new THREE.PlaneGeometry( 40, 40 ),
        new THREE.MeshPhongMaterial( { ambient: 0x7799cc, color: 0x66aacc, specular: 0xdddddd } )
    );
    plane.rotation.x = -Math.PI/2;
    plane.position.y = -1.2;
    scene.add( plane );

    plane.receiveShadow = true;

    // PLY file
    loadPLYFile();
    // Load your OBJ file using a library like three.js
    loadAndAddOBJ();

    light1 = new THREE.DirectionalLight( 0xaaaaaa, 0.5);
    light1.position.set( -0.5, 1, 0.5 );
    scene.add( light1 );

    light2 = new THREE.DirectionalLight( 0xffffff );
    light2.position.set( -1, 1, 0 )
    scene.add( light2 );

    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.setClearColor( scene.fog.color, 1 );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    renderer.shadowMapEnabled = true;
    renderer.shadowMapCullFace = THREE.CullFaceBack;

    // Mouse tooltip
    renderer.autoClear = false;
    // Mouse tooltip

    container.appendChild( renderer.domElement );

    // mouse control
    // controls = new THREE.OrbitControls(camera, renderer.domElement );
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.minDistance = 0;
    // controls.maxDistance = 3;
    // controls.center[1] = 1;


    // resize
    // window.addEventListener( 'resize', onWindowResize, false );

    // Mouse tooltip init
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    // Mouse tooltip init
}


// animate function
function animate() {

    requestAnimationFrame( animate );


    light1.position.x = -1.45*camera.position.z;
    light1.position.z = 1.75 * camera.position.x;

    light2.position.x = camera.position.x;
    light2.position.z = camera.position.z;

    // Apply PCA data to the vertices to morph
    if(oldStt != anth.STATURE || oldBMI != anth.BMI 
        || oldGen != anth.GENDER|| oldAge != anth.AGE
        || oldSHS != anth.SHS || oldStd != anth.STUDY)
    {
        
        gui.__controllers[1].updateDisplay();

        oldStt = anth.STATURE;
        oldBMI = anth.BMI;
        oldAge = anth.AGE;
        oldGen = anth.GENDER;
        oldSHS = anth.SHS;
        oldStd = anth.STUDY;
        
        
        loadPLYFile();
    }

    // Mouse tooltip
    renderer.clear();
    renderer.render( scene, camera );
    renderer.clearDepth();
    renderer.render( sceneOrtho, cameraOrtho );
    // Mouse tooltip

}


// we wait until the PCA data is loaded before redering
$(document).ready(function()  {
    jQuery.get('model/Anth2Data.csv', function(data) {
        init(CSVToArray(data));
        animate();
    });
});
