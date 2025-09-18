import React from "react";

export default function About() {
    return (
        <div className="container my-5">
            <h1 className="mb-4 text-center">About This Project</h1>

            <section className="mb-5">
                <h2 className="mb-3">Project Overview</h2>
                <p>
                    Welcome to our <strong>Microservice Architecture for Products and Orders</strong> application.
                    This project demonstrates the implementation of a modern software architecture
                    that separates functionalities into distinct services, each responsible for a specific business capability.
                    The application is designed to manage products and orders, providing a clear example of how microservices
                    can be utilized to build scalable and maintainable systems.
                </p>
            </section>

            <section className="mb-5">
                <h2 className="mb-3">Architecture</h2>
                <h5 className="mt-3">Microservices vs Monolithic Architecture</h5>
                <ul>
                    <li>
                        <strong>Monolithic Architecture:</strong> In a monolithic system, all components
                        of the application are interconnected and run as a single service. While this approach
                        can be simpler initially, it becomes harder to scale and maintain as the app grows.
                    </li>
                    <li>
                        <strong>Microservices Architecture:</strong> This approach breaks down the application
                        into smaller, independent services, each responsible for a specific business function.
                        These services communicate over a network using lightweight protocols like HTTP or messaging queues.
                        This separation allows better scalability, easier maintenance, and independent deployment of services.
                        {/* (<a href="https://microservices.io/patterns/microservices.html" target="_blank" rel="noopener noreferrer">Learn More</a>) */}
                    </li>
                </ul>

                <h5 className="mt-3">Code Structure</h5>
                <ul>
                    <li><strong>Products Service:</strong> Manages product-related operations such as creating, updating, and retrieving products.</li>
                    <li><strong>Orders Service:</strong> Handles order processing including creating orders, updating statuses, and managing customer data.</li>
                </ul>
            </section>

            <section className="mb-5">
                <h2 className="mb-3">Developer Profile</h2>
                <p><strong>Name:</strong> Sagar Singh</p>
                <p><strong>Role:</strong> Full Stack Developer</p>
                <p><strong>Location:</strong> Mumbai, India</p>
                <p><strong>Contact:</strong> <a href="mailto:sagarsatendrasingh408@gmail.com">sagarsatendrasingh408@gmail.com</a> | <a href="https://in.linkedin.com/in/sagar-singh-019a23280" target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href="https://github.com/sagarr-singh" target="_blank" rel="noopener noreferrer">GitHub</a></p>

                <h5 className="mt-3">Expertise</h5>
                <ul>
                    <li>Microservices Architecture: Designing and implementing systems for scalability and maintainability.</li>
                    <li>Cloud Computing: Leveraging cloud platforms for deployment and management.</li>
                    <li>DevOps Practices: Implementing CI/CD pipelines to streamline development.</li>
                    <li>Programming Languages: JavaScript, NodeJs, and NestJs, Docker</li>
                    <li>Databases: Postgres, SQL, Prisma ORM, Mongo DB</li>
                </ul>
            </section>
        </div>
    );
}
