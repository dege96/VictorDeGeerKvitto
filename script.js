// Event listeners för navigering
const portfolio = document.querySelector(".portfolio");
const KognitivetVideoLink = document.getElementsByClassName("KognitivetVideoLink");
const KognitivetMusicLink = document.getElementsByClassName("KognitivetMusicLink");
const Kognitivet_Video_and_Music_Link = document.getElementsByClassName("Kognitivet_Video_and_Music_Link");
const VideosKognitivetContainer = document.getElementById("VideosKognitivetContainer");
const MusicKognitivetContainer = document.getElementById("MusicKognitivetContainer");
const ImageDesignContainer = document.getElementById("ImageDesignContainer");
const ImageDesignLink = document.getElementsByClassName("ImageDesignLink");
const BackArrows = document.querySelectorAll(".back_arrow");

// Back arrow click handler
BackArrows.forEach((BackArrow) => {
    BackArrow.addEventListener('click', (event) => {
        console.log("BackArrow clicked");
        const containers = [
            VideosKognitivetContainer,
            MusicKognitivetContainer,
            ImageDesignContainer
        ];
        
        containers.forEach(container => {
            if (container) {
                container.style.display = "none";
            }
        });
        
        portfolio.style.display = "block";
    });
});

// Navigation event listeners för olika sektioner
for (let i = 0; i < KognitivetVideoLink.length; i++) {
    KognitivetVideoLink[i].addEventListener('click', (event) => {
        console.log("KognitivetVideoLink clicked");
        portfolio.style.display = "none";
        VideosKognitivetContainer.style.display = "flex";
    });
}

for (let i = 0; i < KognitivetMusicLink.length; i++) {
    KognitivetMusicLink[i].addEventListener('click', (event) => {
        console.log("KognitivetMusicLink clicked");
        portfolio.style.display = "none";
        MusicKognitivetContainer.style.display = "flex";
    });
}

for (let i = 0; i < Kognitivet_Video_and_Music_Link.length; i++) {
    Kognitivet_Video_and_Music_Link[i].addEventListener('click', (event) => {
        console.log("Kognitivet_Video_and_Music_Link clicked");
        portfolio.style.display = "none";
        MusicKognitivetContainer.style.display = "flex";
        VideosKognitivetContainer.style.display = "flex";
    });
}

for (let i = 0; i < ImageDesignLink.length; i++) {
    ImageDesignLink[i].addEventListener('click', (event) => {
        console.log("ImageDesignLink clicked");
        portfolio.style.display = "none";
        ImageDesignContainer.style.display = "flex";
        // Ge bilderna lite tid att laddas innan physics startar
        setTimeout(initPhysics, 200);
    });
}

// Kopiera till urklipp funktion
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const messageElement = document.getElementById('copied-message');
        messageElement.style.display = 'block';
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Video hover info box hantering
document.addEventListener('DOMContentLoaded', function() {
    const infoBox = document.getElementById('video-info-box');
    const videos = document.querySelectorAll('#VideosKognitivet .video, .IphoneVideo');
    const container = document.getElementById('VideosKognitivet');

    videos.forEach(video => {
        // Mousemove event för info box
        video.addEventListener('mousemove', (e) => {
            // Samla contribution data
            const tasks = [];
            if (video.dataset.music === "true") tasks.push("Music");
            if (video.dataset.filming === "true") tasks.push("Filming");
            if (video.dataset.editing === "true") tasks.push("Editing");
            if (video.dataset.directing === "true") tasks.push("Directing");

            // Uppdatera info box innehåll
            infoBox.querySelector('.info-content').innerHTML = `
                <h3 class="Contribution">Contribution</h3>
                <ul>
                    ${tasks.map(task => `<li>${task}</li>`).join('')}
                </ul>
            `;

            // Positionera info box
            infoBox.style.display = 'block';
            infoBox.style.left = (e.clientX + 15) + 'px';
            infoBox.style.top = (e.clientY + 15) + 'px';
        });

        video.addEventListener('mouseleave', () => {
            infoBox.style.display = 'none';
        });
    });
});

// Physics engine initialisering och setup
function initPhysics() {
    // Matter.js moduler
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    // Skapa physics engine och setup
    const engine = Engine.create();
    const container = document.getElementById('ImageDesign');

    // Renderer setup
    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: 'transparent'
        }
    });

    // Mouse interaction setup
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.01,
            render: { visible: false },
            angularStiffness: 0.01,
            length: 0.1,
            damping: 1
        },
        collisionFilter: {
            mask: 0x0001
        },
        stiffness: 0.1,
        maxForce: 0.1
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Skapa väggar för physics world
    const walls = [
        // Botten vägg
        Bodies.rectangle(window.innerWidth/2, window.innerHeight + 30, window.innerWidth, 60, { 
            isStatic: true,
            render: { visible: false },
            friction: 0.5,
            restitution: 0.1,
            slop: 0.1,        // Minska genomträngning
            density: 1,       // Öka densitet för bättre kollision
            chamfer: { radius: 0 }
        }),
        // Vänster vägg
        Bodies.rectangle(-50, window.innerHeight/2, 100, window.innerHeight, { 
            isStatic: true,
            render: { visible: false },
            friction: 0.5,
            restitution: 0.1
        }),
        // Höger vägg
        Bodies.rectangle(window.innerWidth + 50, window.innerHeight/2, 100, window.innerHeight, { 
            isStatic: true,
            render: { visible: false },
            friction: 0.5,
            restitution: 0.1
        })
    ];

    Composite.add(engine.world, walls);

    // Deklarera arrays och hämta bilder
    const bodies = [];
    const images = document.querySelectorAll('.design-image');
    const originalSizes = new Map();

    // Lägg till dubbelklick hantering i createPhysicsBody
    function createPhysicsBody(img) {
        // Beräkna maximal storlek baserat på både bredd och höjd
        const maxWidth = window.innerWidth / 3;
        const maxHeight = window.innerHeight / 3;
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        
        // Beräkna dimensioner som passar inom båda begränsningarna
        let width = Math.min(img.naturalWidth, maxWidth);
        let height = width / aspectRatio;
        
        // Om höjden är för stor, justera baserat på höjd istället
        if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
        }
        
        // Spara original storlek
        originalSizes.set(img.src, { width, height });
        
        const startY = 100;
        const body = Bodies.rectangle(
            Math.random() * (window.innerWidth - width - 200) + width/2 + 100,
            startY,
            width,
            height,
            {
                render: {
                    sprite: {
                        texture: img.src,
                        xScale: width / img.naturalWidth,
                        yScale: height / img.naturalHeight
                    }
                },
                restitution: 0.2,
                friction: 0.1,
                density: 0.001,        // Minska densiteten
                frictionAir: 0.01,     // Öka luftmotståndet något
                slop: 0.05,           // Minska genomträngning
                collisionFilter: {
                    category: 0x0001,
                    mask: 0xFFFFFFFF
                }
            }
        );

        // Lägg till dubbelklick detektion
        let lastClickTime = 0;
        Matter.Events.on(mouseConstraint, 'mousedown', function(event) {
            const mousePosition = event.mouse.position;
            const currentTime = new Date().getTime();
            
            if (Matter.Bounds.contains(body.bounds, mousePosition)) {
                if (currentTime - lastClickTime < 300) { // Dubbelklick inom 300ms
                    const originalSize = originalSizes.get(body.render.sprite.texture);
                    const scaleFactor = 1.2;
                    
                    // Spara ursprungliga värden
                    const startAngle = body.angle;
                    const startPos = { x: body.position.x, y: body.position.y };
                    const targetPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
                    const startScale = 1;
                    const targetScale = scaleFactor;
                    
                    const animationDuration = 500; // 500ms
                    const startTime = Date.now();
                    
                    // Stoppa all rörelse
                    Matter.Body.setVelocity(body, { x: 0, y: 0 });
                    Matter.Body.setAngularVelocity(body, 0);
                    body.isStatic = true;
                    
                    // Animera allt tillsammans
                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / animationDuration, 1);
                        
                        // Cubic easing
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        
                        // Animera rotation
                        const currentAngle = startAngle + (0 - startAngle) * easeProgress;
                        Matter.Body.setAngle(body, currentAngle);
                        
                        // Animera position
                        const currentX = startPos.x + (targetPos.x - startPos.x) * easeProgress;
                        const currentY = startPos.y + (targetPos.y - startPos.y) * easeProgress;
                        Matter.Body.setPosition(body, { x: currentX, y: currentY });
                        
                        // Animera storlek med bättre kontroll
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            // När animationen är klar
                            setTimeout(() => {
                                // Återställ physics-kroppen till originalstorlek
                                Matter.Body.setPosition(body, {
                                    x: window.innerWidth / 2,
                                    y: window.innerHeight / 2
                                });
                                Matter.Body.scale(body, 1, 1);
                                body.isStatic = false;
                            }, 1000);
                        }
                    };
                    
                    // Starta animationen
                    animate();
                }
                lastClickTime = currentTime;
            }
        });

        bodies.push(body);
        Composite.add(engine.world, body);
    }

    // Skapa physics bodies för alla bilder
    images.forEach(img => {
        if (img.complete) {
            createPhysicsBody(img);
        } else {
            img.addEventListener('load', () => createPhysicsBody(img));
        }
        img.style.display = 'none';
    });

    // Hover effekt för bilderen 
    Matter.Events.on(mouseConstraint, 'mousemove', function(event) {
        const mousePosition = event.mouse.position;
        bodies.forEach(body => {
            const distance = Matter.Vector.magnitude(Matter.Vector.sub(body.position, mousePosition));
            if (distance < 100) {
                Matter.Body.applyForce(body, body.position, {
                    x: 0,
                    y: -0.003
                });
            }
        });
    });

    // Rotationshantering för bilder
    Matter.Events.on(mouseConstraint, 'mousedown', function(event) {
        const mousePosition = event.mouse.position;
        bodies.forEach(body => {
            const vertices = body.vertices;
            const center = body.position;
            
            const distanceToCenter = Matter.Vector.magnitude(
                Matter.Vector.sub(mousePosition, center)
            );
            
            if (distanceToCenter > Math.min(body.bounds.max.x - body.bounds.min.x, 
                                          body.bounds.max.y - body.bounds.min.y) * 0.4) {
                body.inertia = body.mass * 1000;
            }
        });
    });

    // Återställ rotation vid släpp
    Matter.Events.on(mouseConstraint, 'mouseup', function() {
        bodies.forEach(body => {
            body.inertia = Infinity;
        });
    });

    // Gravitation setup
    engine.world.gravity.y = 1;
    engine.world.gravity.scale = 0.001;  // Dubbla gravitationen tillbaka till original

    // Starta physics engine
    Runner.run(engine);
    Render.run(render);

    // Window resize hantering
    window.addEventListener('resize', function() {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        Matter.Render.setPixelRatio(render, window.devicePixelRatio);
    });
}



