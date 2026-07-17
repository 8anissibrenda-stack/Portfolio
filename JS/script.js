//TIMELINE ANIMATION
const timelineItems = document.querySelectorAll(".timeline-item");
const observer = new IntersectionObserver(
(entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            const index = [...timelineItems].indexOf(entry.target);
            setTimeout(()=>{
                entry.target.classList.add("show");
            }, index * 180);
        }
    });
},
{
    threshold:0.3
});
timelineItems.forEach((item)=>{
    observer.observe(item);
});