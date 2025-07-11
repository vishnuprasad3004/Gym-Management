document.addEventListener("DOMContentLoaded", function() {
    const videos = document.querySelectorAll('.training video');

    videos.forEach(video => {
        video.addEventListener('mouseover', function() {
            this.play();
        });

        video.addEventListener('mouseout', function() {
            this.pause();
            this.currentTime = 0;
            this.load(); // Reloads the video to show the poster again
        });
    });
});
