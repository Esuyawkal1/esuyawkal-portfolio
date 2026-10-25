"use client";

import { useEffect, useRef, useState } from "react";

export default function CyberParticles() {
  const canvasRef = useRef(null);
  const [isOverdrive, setIsOverdrive] = useState(false);

  useEffect(() => {
    const handleOverdrive = (e) => {
      setIsOverdrive(Boolean(e.detail));
    };
    window.addEventListener("cyber_overdrive_toggle", handleOverdrive);
    return () => {
      window.removeEventListener("cyber_overdrive_toggle", handleOverdrive);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const ripples = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 180,
        alpha: 0.8,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    const particleCount = Math.min(Math.floor((width * height) / 14000), 100);
    let particles = [];

    const colors = isOverdrive
      ? ["#10b981", "#059669", "#34d399", "#6ee7b7"]
      : ["#f43f5e", "#38bdf8", "#fb7185", "#0ea5e9"];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * (isOverdrive ? 2.5 : 0.8);
        this.vy = (Math.random() - 0.5) * (isOverdrive ? 2.5 : 0.8);
        this.baseRadius = Math.random() * 2 + 1;
        this.radius = this.baseRadius;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 3;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force;
          this.y -= Math.sin(angle) * force;
          this.radius = this.baseRadius * 1.8;
        } else {
          this.radius = Math.max(this.baseRadius, this.radius - 0.05);
        }

        // Ripple interaction
        for (let i = 0; i < ripples.length; i++) {
          const r = ripples[i];
          const rdx = this.x - r.x;
          const rdy = this.y - r.y;
          const rdist = Math.hypot(rdx, rdy);
          if (Math.abs(rdist - r.radius) < 25) {
            const angle = Math.atan2(rdy, rdx);
            this.x += Math.cos(angle) * 4;
            this.y += Math.sin(angle) * 4;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = isOverdrive ? 12 : 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw active ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += isOverdrive ? 7 : 4;
        r.alpha -= 0.02;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isOverdrive ? "#10b981" : "#f43f5e";
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = r.alpha;
        ctx.stroke();
        ctx.restore();
      }

      // Draw constellation connections
      const maxConnectDist = isOverdrive ? 140 : 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * (isOverdrive ? 0.35 : 0.2);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isOverdrive ? "#10b981" : "#0284c7";
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
    };
  }, [isOverdrive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-20 transition-opacity duration-700"
      style={{ opacity: isOverdrive ? 0.95 : 0.75 }}
    />
  );
}
