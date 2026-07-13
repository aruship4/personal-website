"use strict";

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((element) => revealObserver.observe(element));

const skillsChart = document.querySelector("#skills-chart");

if (skillsChart && window.d3) {
  const data = [
    { skill: "Python", value: 92 },
    { skill: "Data Viz", value: 86 },
    { skill: "ML", value: 82 },
    { skill: "Research", value: 88 }
  ];

  const width = 320;
  const height = 180;
  const margin = { top: 8, right: 12, bottom: 8, left: 78 };

  const svg = d3
    .select("#skills-chart")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Animated overview of technical focus areas");

  const x = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.skill))
    .range([margin.top, height - margin.bottom])
    .padding(0.38);

  svg.selectAll(".skill-track")
    .data(data)
    .join("rect")
    .attr("class", "skill-track")
    .attr("x", margin.left)
    .attr("y", (d) => y(d.skill))
    .attr("width", width - margin.left - margin.right)
    .attr("height", y.bandwidth())
    .attr("rx", y.bandwidth() / 2);

  svg.selectAll(".skill-bar")
    .data(data)
    .join("rect")
    .attr("class", "skill-bar")
    .attr("x", margin.left)
    .attr("y", (d) => y(d.skill))
    .attr("height", y.bandwidth())
    .attr("rx", y.bandwidth() / 2)
    .attr("width", 0)
    .transition()
    .duration(1000)
    .delay((_, index) => index * 120)
    .ease(d3.easeCubicOut)
    .attr("width", (d) => x(d.value) - margin.left);

  svg.selectAll(".skill-label")
    .data(data)
    .join("text")
    .attr("class", "skill-label")
    .attr("x", margin.left - 10)
    .attr("y", (d) => y(d.skill) + y.bandwidth() / 2)
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .text((d) => d.skill);
}

const profileCard = document.querySelector(".profile-card");
if (profileCard) {
  profileCard.addEventListener("mousemove", (event) => {
    const bounds = profileCard.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = ((x / bounds.width) - 0.5) * 5;
    const rotateX = ((y / bounds.height) - 0.5) * -5;
    profileCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  profileCard.addEventListener("mouseleave", () => {
    profileCard.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
}

const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = ((x / bounds.width) - 0.5) * 1.5;
    const rotateX = ((y / bounds.height) - 0.5) * -1.5;
    card.style.transform = `perspective(1000px) translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg)";
  });
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const navigationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { threshold: 0.35 }
);

sections.forEach((section) => navigationObserver.observe(section));
