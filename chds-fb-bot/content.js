(function() {
    'use strict';

    console.log('%c🛡️ CHDS Autoreport Tool LOADED', 'color: #5DE7F5; font-size: 18px; font-weight: bold; text-shadow: 0 0 15px #5DE7F5;');

    const reportActions = [
        // Fake Profile Group (1-8)
        { step: 1, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 2, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 3, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 4, name: "Fake profile", xpath: "//span[contains(text(),'Fake profile')]" },
        { step: 5, name: "They're not a real person", xpath: "//span[contains(text(),'They\\'re not a real person')]" },
        { step: 6, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 7, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 8, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Fake profile alternative / Me option (9-16)
        { step: 9, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 10, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 11, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 12, name: "Fake profile", xpath: "//span[contains(text(),'Fake profile')]" },
        { step: 13, name: "Me", xpath: "//span[text()='Me']" },
        { step: 14, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 15, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 16, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Problem involving someone under 18 - Physical abuse (17-24)
        { step: 17, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 18, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 19, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 20, name: "Problem involving someone under 18", xpath: "//span[contains(text(),'Problem involving someone under 18')]" },
        { step: 21, name: "Physical abuse", xpath: "//span[contains(text(),'Physical abuse')]" },
        { step: 22, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 23, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 24, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Violent, hateful content (25-32)
        { step: 25, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 26, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 27, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 28, name: "Violent, hateful content", xpath: "//span[contains(text(),'Violent, hateful or disturbing content')]" },
        { step: 29, name: "Credible threat to safety", xpath: "//span[contains(text(),'Credible threat to safety')]" },
        { step: 30, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 31, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 32, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Scam, fraud (33-40)
        { step: 33, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 34, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 35, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 36, name: "Scam, fraud", xpath: "//span[contains(text(),'Scam, fraud or false information')]" },
        { step: 37, name: "Fraud or scam", xpath: "//span[contains(text(),'Fraud or scam')]" },
        { step: 38, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 39, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 40, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Scam, fraud - Sharing false information (New Addition 1) (41-47)
        { step: 41, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 42, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 43, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 44, name: "Scam, fraud", xpath: "//span[contains(text(),'Scam, fraud or false information')]" },
        { step: 45, name: "Sharing false information", xpath: "//span[contains(text(),'Sharing false information')]" },
        { step: 46, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Scam, fraud - Spam (New Addition 2) (48-54)
        { step: 47, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 48, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 49, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 50, name: "Scam, fraud", xpath: "//span[contains(text(),'Scam, fraud or false information')]" },
        { step: 51, name: "Spam", xpath: "//span[contains(text(),'Spam')]" },
        { step: 52, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Something else (55-58)
        { step: 53, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 54, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 55, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 56, name: "Something else", xpath: "//span[contains(text(),'Something else')]" },
        { step: 57, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Restricted items - Drugs (60-67)
        { step: 58, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 59, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 60, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 61, name: "Selling or promoting restricted items", xpath: "//span[contains(text(),'Selling or promoting restricted items') or contains(text(),'Sale of regulated goods') or contains(text(),'restricted items')]" },
        { step: 62, name: "Drugs", xpath: "//span[contains(text(),'Drugs')]" },
        { step: 63, name: "Highly addictive drugs", xpath: "//span[contains(text(),'Highly addictive drugs') or contains(text(),'cocaine') or contains(text(),'heroin') or contains(text(),'fentanyl')]" },
        { step: 64, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 65, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 66, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Restricted items - Weapons (69-76)
        { step: 67, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 68, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 69, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 70, name: "Selling or promoting restricted items", xpath: "//span[contains(text(),'Selling or promoting restricted items') or contains(text(),'Sale of regulated goods') or contains(text(),'restricted items')]" },
        { step: 71, name: "Weapons", xpath: "//span[contains(text(),'Weapons')]" },
        { step: 72, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 73, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 74, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Restricted items - Alcohol (77-84)
        { step: 75, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 76, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 77, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 78, name: "Selling or promoting restricted items", xpath: "//span[contains(text(),'Selling or promoting restricted items') or contains(text(),'Sale of regulated goods') or contains(text(),'restricted items')]" },
        { step: 79, name: "Alcohol", xpath: "//span[contains(text(),'Alcohol')]" },
        { step: 81, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 82, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 83, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Restricted items - Tobacco (85-92)
        { step: 84, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 85, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 86, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 87, name: "Selling or promoting restricted items", xpath: "//span[contains(text(),'Selling or promoting restricted items') or contains(text(),'Sale of regulated goods') or contains(text(),'restricted items')]" },
        { step: 88, name: "Tobacco", xpath: "//span[contains(text(),'Tobacco')]" },
        { step: 89, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 90, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 91, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Restricted items - Gambling (93-100)
        { step: 92, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 93, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 94, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 95, name: "Selling or promoting restricted items", xpath: "//span[contains(text(),'Selling or promoting restricted items') or contains(text(),'Sale of regulated goods') or contains(text(),'restricted items')]" },
        { step: 96, name: "Gambling", xpath: "//span[contains(text(),'Gambling')]" },
        { step: 97, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 98, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 99, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Restricted items - Animals (101-108)
        { step: 100, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 101, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 102, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 103, name: "Selling or promoting restricted items", xpath: "//span[contains(text(),'Selling or promoting restricted items') or contains(text(),'Sale of regulated goods') or contains(text(),'restricted items')]" },
        { step: 104, name: "Animals", xpath: "//span[contains(text(),'Animals')]" },
        { step: 105, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 106, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 107, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Under 18 - Nude images threat (109-116)
        { step: 108, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 109, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 110, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 111, name: "Problem involving someone under 18", xpath: "//span[contains(text(),'Problem involving someone under 18')]" },
        { step: 112, name: "Threatening to share my nude images", xpath: "//span[contains(text(),'Threatening to share my nude images')]" },
        { step: 113, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 114, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 115, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" },

        // Under 18 - Sexual exploitation (117-124)
        { step: 116, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 117, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 118, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 119, name: "Problem involving someone under 18", xpath: "//span[contains(text(),'Problem involving someone under 18')]" },
        { step: 120, name: "Seems like sexual exploitation", xpath: "//span[contains(text(),'Seems like sexual exploitation')]" },
        { step: 121, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 122, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 123, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" }, 
        
        { step: 124, name: "Menu (3 dots)", xpath: "//*[@aria-label='Profile settings see more options']" },
        { step: 125, name: "Report profile", xpath: "//span[contains(text(),'Report profile')]" },
        { step: 126, name: "Something about this profile", xpath: "//span[contains(text(),'Something about this profile')]" },
        { step: 127, name: "Adult content", xpath: "//span[contains(text(),'Adult content')]" },
        { step: 128, name: "Seems like prostitution", xpath: "//span[contains(text(),'Seems like prostitution')]" },
        { step: 129, name: "Submit", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Submit')]" },
        { step: 130, name: "Next", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Next')]" },
        { step: 131, name: "Done", xpath: "//div[contains(@class,'xdj266r')]//span[contains(text(),'Done')]" }, 
    
     ];

    const BASE_DELAY = 2500;

    let isRunning = false;
    let stopRequested = false;
    let loopCount = 0;
    let reportCount = 0;

    const initUI = () => {
        if (document.getElementById('chds-panel')) return;

        const style = document.createElement('style');
        style.id = 'chds-style';
        style.innerText = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');

:root {
    --deep-blue: #16049E;
    --electric-blue: #2612B8;
    --deep-purple: #430D98;
    --purple: #631299;
    --violet: #6A199C;
    --light-purple: #9A56BA;
    --lavender: #B07ECC;
    --cyan: #5DE7F5;
    --pink: #D66BDE;
    --white: #F5F5F7;
    --bg-panel: rgba(10, 4, 30, 0.95);
    --glass-border: rgba(93, 231, 245, 0.15);
    --shadow-glow: 0 12px 48px rgba(22, 4, 158, 0.4);
    --radius-lg: 20px;
    --radius-sm: 10px;
}

* {
    box-sizing: border-box;
}

@keyframes borderFlow {
    0% {
        border-color: var(--cyan);
        box-shadow: 0 0 30px rgba(93, 231, 245, 0.2);
    }
    33% {
        border-color: var(--violet);
        box-shadow: 0 0 30px rgba(106, 25, 156, 0.2);
    }
    66% {
        border-color: var(--pink);
        box-shadow: 0 0 30px rgba(214, 107, 222, 0.2);
    }
    100% {
        border-color: var(--cyan);
        box-shadow: 0 0 30px rgba(93, 231, 245, 0.2);
    }
}

@keyframes shimmer {
    0% {
        background-position: -200% center;
    }
    100% {
        background-position: 200% center;
    }
}

@keyframes pulseRing {
    0% {
        box-shadow: 0 0 0 0 rgba(93, 231, 245, 0.4);
    }
    70% {
        box-shadow: 0 0 0 12px rgba(93, 231, 245, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(93, 231, 245, 0);
    }
}

#chds-panel {
    position: fixed;
    top: 24px;
    right: 24px;
    width: 390px;
    max-height: calc(100vh - 48px);
    overflow-y: auto;
    background:
        linear-gradient(
            145deg,
            rgba(67, 13, 152, 0.2),
            rgba(22, 4, 158, 0.12)
        ),
        var(--bg-panel);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    color: var(--white);
    padding: 0;
    border-radius: var(--radius-lg);
    z-index: 999998;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    font-size: 13px;
    border: 2px solid var(--cyan);
    animation: borderFlow 6s infinite ease-in-out;
    box-shadow:
        var(--shadow-glow),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    scrollbar-width: thin;
    scrollbar-color: rgba(93, 231, 245, 0.2) transparent;
}

#chds-panel::-webkit-scrollbar {
    width: 4px;
}

#chds-panel::-webkit-scrollbar-track {
    background: transparent;
}

#chds-panel::-webkit-scrollbar-thumb {
    background: rgba(93, 231, 245, 0.2);
    border-radius: 4px;
}

.panel-header {
    padding: 18px 22px 14px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: move;
    border-bottom: 1px solid var(--glass-border);
    background:
        linear-gradient(
            180deg,
            rgba(93, 231, 245, 0.06) 0%,
            rgba(106, 25, 156, 0.04) 50%,
            transparent 100%
        );
}

.panel-title-group {
    flex: 1;
    min-width: 0;
}

.panel-title {
    margin: 0;
    font-size: 20px;
    font-weight: 900;
    letter-spacing: -0.3px;
    background:
        linear-gradient(
            135deg,
            var(--cyan),
            var(--lavender),
            var(--pink)
        );
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s ease-in-out infinite;
    line-height: 1.2;
}

.panel-sub {
    font-size: 11px;
    color: var(--lavender);
    margin-top: 2px;
    letter-spacing: 0.3px;
    font-weight: 600;
}

.panel-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

.minimize-btn {
    color: var(--lavender);
    font-size: 20px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 8px;
    transition: all 0.2s;
    line-height: 1;
    background: none;
    border: none;
    font-family: inherit;
}

.minimize-btn:hover {
    color: var(--white);
    background: rgba(255, 255, 255, 0.08);
}

.panel-body {
    padding: 18px 22px 22px 22px;
}

.section-box {
    background:
        linear-gradient(
            135deg,
            rgba(22, 4, 158, 0.3),
            rgba(67, 13, 152, 0.24)
        );
    padding: 14px 16px;
    border-radius: 14px;
    margin-bottom: 14px;
    border: 1px solid var(--glass-border);
    transition: all 0.25s ease;
}

.section-box:hover {
    background:
        linear-gradient(
            135deg,
            rgba(38, 18, 184, 0.4),
            rgba(106, 25, 156, 0.32)
        );
    border-color: rgba(93, 231, 245, 0.3);
    box-shadow: 0 8px 30px rgba(22, 4, 158, 0.18);
}

.section-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--cyan);
    font-weight: 700;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.section-label .badge {
    font-size: 8px;
    background: rgba(93, 231, 245, 0.2);
    padding: 1px 8px;
    border-radius: 12px;
    color: var(--cyan);
    letter-spacing: 0.5px;
}

.license-status {
    font-size: 14px;
    font-weight: 700;
    color: var(--cyan);
    text-shadow: 0 0 20px rgba(93, 231, 245, 0.3);
    display: flex;
    align-items: center;
    gap: 8px;
}

.license-status .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--cyan);
    animation: pulseRing 2s infinite;
}

.data-grid {
    display: flex;
    gap: 12px;
    margin-top: 4px;
}

.data-tile {
    flex: 1;
    background:
        linear-gradient(
            145deg,
            rgba(10, 4, 30, 0.75),
            rgba(67, 13, 152, 0.16)
        );
    border-radius: 10px;
    padding: 12px 8px;
    text-align: center;
    border: 1px solid var(--glass-border);
    transition: all 0.25s ease;
}

.data-tile:hover {
    border-color: rgba(93, 231, 245, 0.4);
    box-shadow: 0 6px 24px rgba(22, 4, 158, 0.2);
}

.tile-label {
    font-size: 9px;
    color: var(--lavender);
    text-transform: uppercase;
    letter-spacing: 0.6px;
    font-weight: 600;
}

.tile-value {
    font-size: 28px;
    font-weight: 900;
    color: var(--cyan);
    text-shadow: 0 0 30px rgba(93, 231, 245, 0.25);
    line-height: 1.3;
    font-variant-numeric: tabular-nums;
}

.status-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 6px 0 8px 0;
    padding: 0 2px;
}

.status-text {
    font-weight: 600;
    font-size: 12px;
    color: var(--lavender);
}

.status-text .status-value {
    color: var(--cyan);
    font-weight: 700;
}

.status-text .status-value.running {
    color: var(--cyan);
}

.status-text .status-value.paused {
    color: var(--pink);
}

.status-text .status-value.stopped {
    color: #ff4466;
}

.progress-track {
    background: rgba(255, 255, 255, 0.06);
    height: 6px;
    border-radius: 6px;
    overflow: hidden;
    margin: 0 0 4px 0;
    border: 1px solid rgba(93, 231, 245, 0.1);
}

.progress-fill {
    width: 0%;
    height: 100%;
    background:
        linear-gradient(
            90deg,
            var(--deep-blue),
            var(--cyan),
            var(--pink)
        );
    background-size: 200% 100%;
    animation: shimmer 3s ease-in-out infinite;
    border-radius: 6px;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-row {
    display: flex;
    gap: 10px;
    margin: 16px 0 14px 0;
}

.action-btn {
    flex: 1;
    padding: 13px 0;
    text-align: center;
    border-radius: 10px;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    border: none;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: inherit;
    letter-spacing: 0.3px;
}

.action-btn.primary {
    background:
        linear-gradient(
            135deg,
            var(--electric-blue),
            var(--deep-purple)
        );
    color: var(--white);
    border: 1px solid var(--cyan);
    box-shadow: 0 4px 20px rgba(38, 18, 184, 0.4);
}

.action-btn.primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 30px rgba(93, 231, 245, 0.4);
    background:
        linear-gradient(
            135deg,
            var(--deep-blue),
            var(--purple)
        );
}

.action-btn.primary.running-state {
    background:
        linear-gradient(
            135deg,
            var(--purple),
            var(--pink)
        );
    box-shadow: 0 4px 20px rgba(214, 107, 222, 0.4);
}

.action-btn.primary.running-state:hover {
    box-shadow: 0 6px 30px rgba(214, 107, 222, 0.6);
}

.action-btn.danger {
    background: transparent;
    color: #ff4d6d;
    border: 1.5px solid #ff4d6d;
}

.action-btn.danger:hover {
    background: #ff4d6d;
    color: var(--white);
    box-shadow: 0 4px 20px rgba(255, 77, 109, 0.3);
}

.log-area {
    background:
        linear-gradient(
            145deg,
            rgba(5, 2, 15, 0.82),
            rgba(22, 4, 158, 0.1)
        );
    padding: 12px 14px;
    border-radius: 10px;
    max-height: 120px;
    overflow-y: auto;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 10.5px;
    border: 1px solid var(--glass-border);
    margin-bottom: 12px;
    scrollbar-width: thin;
    scrollbar-color: rgba(93, 231, 245, 0.2) transparent;
    line-height: 1.6;
}

.log-area::-webkit-scrollbar {
    width: 3px;
}

.log-area::-webkit-scrollbar-track {
    background: transparent;
}

.log-area::-webkit-scrollbar-thumb {
    background: rgba(93, 231, 245, 0.2);
    border-radius: 4px;
}

.log-entry {
    margin-bottom: 2px;
    display: flex;
    gap: 8px;
    align-items: baseline;
}

.log-time {
    color: var(--light-purple);
    flex-shrink: 0;
    font-size: 9.5px;
}

.log-green {
    color: var(--cyan);
}

.log-red {
    color: #ff4466;
}

.log-yellow {
    color: var(--pink);
}

.log-blue {
    color: var(--lavender);
}

.log-white {
    color: var(--white);
}

.footer-text {
    font-size: 10px;
    color: var(--lavender);
    text-align: center;
    padding-top: 10px;
    border-top: 1px solid var(--glass-border);
    letter-spacing: 0.2px;
}

.footer-text strong {
    color: var(--cyan);
    font-weight: 700;
}

#minimized-icon-chds {
    display: none;
    position: fixed;
    top: 24px;
    right: 24px;
    width: 52px;
    height: 52px;
    background:
        linear-gradient(
            145deg,
            rgba(67, 13, 152, 0.45),
            rgba(10, 4, 30, 0.95)
        );
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 50%;
    border: 2px solid var(--cyan);
    box-shadow: 0 0 40px rgba(93, 231, 245, 0.3);
    z-index: 999999;
    cursor: pointer;
    text-align: center;
    line-height: 48px;
    font-size: 20px;
    color: var(--cyan);
    animation: borderFlow 4s infinite alternate;
    transition: all 0.3s ease;
    font-weight: 900;
}

#minimized-icon-chds:hover {
    transform: scale(1.05);
    box-shadow: 0 0 60px rgba(93, 231, 245, 0.5);
}

@media (max-width: 480px) {
    #chds-panel {
        width: calc(100vw - 32px);
        right: 16px;
        top: 16px;
        max-height: calc(100vh - 32px);
    }

    .panel-header {
        padding: 14px 16px 10px 16px;
        flex-wrap: wrap;
    }

    .panel-body {
        padding: 14px 16px 18px 16px;
    }

    .panel-title {
        font-size: 17px;
    }

    .data-grid {
        flex-direction: row;
    }

    .tile-value {
        font-size: 22px;
    }
}
        `;
        document.head.appendChild(style);

        const panel = document.createElement('div');
        panel.id = 'chds-panel';
        panel.innerHTML = `
            <div class="panel-header">
                <div class="panel-title-group">
                    <div class="panel-title">CHDS Autoreport Tool</div>
                    <div class="panel-sub">Made By CHDS Nico Adajar</div>
                </div>
                <div class="panel-controls">
                    <button class="minimize-btn" id="minimize-toggle" title="Minimize">−</button>
                </div>
            </div>
            <div class="panel-body">
                <div class="section-box">
                    <div class="section-label">⚡ Status <span class="badge">ACTIVE</span></div>
                    <div class="license-status"><span class="dot"></span> Developed by CHDS</div>
                </div>
                <div class="data-grid">
                    <div class="data-tile"><div class="tile-label">Reports</div><div class="tile-value" id="chds-reports">0</div></div>
                    <div class="data-tile"><div class="tile-label">Loops</div><div class="tile-value" id="chds-loops">0</div></div>
                </div>
                <div class="status-row">
                    <span class="status-text">Status: <span class="status-value" id="chds-status">Idle</span></span>
                    <span style="font-size:10px; color:var(--lavender);" id="chds-step-info">Ready</span>
                </div>
                <div class="progress-track"><div class="progress-fill" id="chds-progress"></div></div>
                <div class="action-row">
                    <button class="action-btn primary" id="chds-start">▶ START</button>
                    <button class="action-btn danger" id="chds-stop">⏹ STOP</button>
                </div>
                <div class="log-area" id="chds-log"></div>
                <div class="footer-text">Developed by <strong>CHDS Nico Adajar</strong> — All rights reserved</div>
            </div>
        `;
        document.body.appendChild(panel);

        const mini = document.createElement('div');
        mini.id = 'minimized-icon-chds';
        mini.textContent = 'CHDS';
        mini.title = 'Expand CHDS Autoreport Tool';
        document.body.appendChild(mini);

        bindEvents();
    };

    const bindEvents = () => {
        const panel = document.getElementById('chds-panel');
        const mini = document.getElementById('minimized-icon-chds');
        const minimizeBtn = document.getElementById('minimize-toggle');
        const startBtn = document.getElementById('chds-start');
        const stopBtn = document.getElementById('chds-stop');

        minimizeBtn.onclick = () => {
            panel.style.display = 'none';
            mini.style.display = 'block';
        };
        mini.onclick = () => {
            mini.style.display = 'none';
            panel.style.display = 'block';
        };
        startBtn.onclick = () => {
            if (isRunning) { pauseTool(); } else { startTool(); }
        };
        stopBtn.onclick = stopTool;

        const header = panel.querySelector('.panel-header');
        let dragging = false, startX, startY, origX, origY;
        header.onmousedown = (e) => {
            if (e.target.closest('.panel-controls')) return;
            dragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = panel.getBoundingClientRect();
            origX = rect.left;
            origY = rect.top;
            document.onmousemove = (ev) => {
                if (!dragging) return;
                panel.style.left = (origX + ev.clientX - startX) + 'px';
                panel.style.top = (origY + ev.clientY - startY) + 'px';
                panel.style.right = 'auto';
            };
            document.onmouseup = () => {
                dragging = false;
                document.onmousemove = null;
            };
            e.preventDefault();
        };
    };

    const addLog = (text, type = "white") => {
        const logArea = document.getElementById('chds-log');
        if (!logArea) return;
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        const cls = `log-${type}`;
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `<span class="log-time">[${time}]</span> <span class="${cls}">${text}</span>`;
        logArea.appendChild(entry);
        logArea.scrollTop = logArea.scrollHeight;
    };

    const checkIsDie = () => {
        const title = document.title;
        const indicators = [
            "Content isn't available",
            "This page isn't available",
            "Page Not Found"
        ];
        return indicators.some(ind => title.includes(ind));
    };

    const findElement = (xpath, timeout = 5000) => {
        return new Promise((resolve) => {
            const startTime = Date.now();
            const check = () => {
                try {
                    const el = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    if (el) { resolve(el); return; }
                } catch (e) {}
                if (Date.now() - startTime < timeout) {
                    setTimeout(check, 200);
                } else {
                    resolve(null);
                }
            };
            check();
        });
    };

    const simulateClick = (el) => {
        try {
            if (!el) return false;
            const hidden = el.closest('[aria-hidden="true"]');
            if (hidden) hidden.removeAttribute('aria-hidden');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            ['mousedown', 'mouseup', 'click'].forEach(ev => {
                el.dispatchEvent(new MouseEvent(ev, { bubbles: true, cancelable: true, view: window }));
            });
            return true;
        } catch (e) {
            return false;
        }
    };

    const isPageLoading = () => {
        const selectors = ['[role="progressbar"]', 'img[src*="loading"]', 'i[class*="loading"]'];
        return selectors.some(sel => {
            const el = document.querySelector(sel);
            return el && el.offsetParent !== null;
        });
    };

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const updateProgress = (pct) => {
        const fill = document.getElementById('chds-progress');
        if (fill) fill.style.width = Math.min(100, Math.max(0, pct)) + '%';
    };

    const updateStatus = (text, type = 'idle') => {
        const el = document.getElementById('chds-status');
        if (!el) return;
        el.textContent = text;
        el.className = 'status-value';
        if (type === 'running') el.classList.add('running');
        else if (type === 'paused') el.classList.add('paused');
        else if (type === 'stopped') el.classList.add('stopped');
    };

    const startTool = async () => {
        if (isRunning) return;
        isRunning = true;
        stopRequested = false;
        const btn = document.getElementById('chds-start');
        btn.textContent = '⏸ PAUSE';
        btn.className = 'action-btn primary running-state';
        updateStatus('Running...', 'running');
        document.getElementById('chds-step-info').textContent = 'Initializing...';
        addLog("🚀 CHDS Autoreport started", "green");

        while (isRunning && !stopRequested) {
            loopCount++;
            document.getElementById('chds-loops').textContent = loopCount;
            if (checkIsDie()) {
                addLog("🎉 Account is dead! Stopping.", "green");
                stopTool();
                break;
            }
            addLog(`🔄 Loop #${loopCount}`, "blue");

            for (let i = 0; i < reportActions.length; i++) {
                if (!isRunning || stopRequested) break;
                const action = reportActions[i];
                document.getElementById('chds-step-info').textContent = `Step ${action.step}: ${action.name}`;
                updateProgress(((i + 1) / reportActions.length) * 100);

                let success = false;
                let retries = 0;
                const maxRetries = 30;

                while (!success && retries < maxRetries && isRunning && !stopRequested) {
                    retries++;
                    try {
                        if (action.xpath) {
                            let el = await findElement(action.xpath, 5000);
                            
                            if (!el && action.name === "They're not a real person") {
                                const altXpaths = [
                                    "//span[contains(text(),'not a real person')]",
                                    "//span[contains(text(),'real person')]"
                                ];
                                for (const alt of altXpaths) {
                                    el = await findElement(alt, 2000);
                                    if (el) break;
                                }
                            }
                            if (!el && action.name === "Selling or promoting restricted items") {
                                const altXpaths = [
                                    "//span[contains(text(),'Selling or promoting')]",
                                    "//span[contains(text(),'restricted items')]",
                                    "//span[contains(text(),'Sale of regulated goods')]"
                                ];
                                for (const alt of altXpaths) {
                                    el = await findElement(alt, 2000);
                                    if (el) break;
                                }
                            }
                            if (!el && action.name === "Me") {
                                const altXpaths = [
                                    "//span[text()='Me']/ancestor::div[@role='button']",
                                    "//span[contains(text(),'Me')]"
                                ];
                                for (const alt of altXpaths) {
                                    el = await findElement(alt, 2000);
                                    if (el) break;
                                }
                            }
                            if (!el && action.name === "Scam, fraud") {
                                const altXpaths = [
                                    "//span[contains(text(),'Scam, fraud')]/ancestor::div[@role='button']",
                                    "//span[contains(text(),'Scam')]"
                                ];
                                for (const alt of altXpaths) {
                                    el = await findElement(alt, 2000);
                                    if (el) break;
                                }
                            }
                            if (!el && action.name === "Sharing false information") {
                                const altXpaths = [
                                    "//span[contains(text(),'Sharing false information')]/ancestor::div[@role='button']",
                                    "//span[contains(text(),'false information')]"
                                ];
                                for (const alt of altXpaths) {
                                    el = await findElement(alt, 2000);
                                    if (el) break;
                                }
                            }
                            if (!el && action.name === "Spam") {
                                const altXpaths = [
                                    "//span[text()='Spam']/ancestor::div[@role='button']",
                                    "//span[contains(text(),'Spam')]"
                                ];
                                for (const alt of altXpaths) {
                                    el = await findElement(alt, 2000);
                                    if (el) break;
                                }
                            }
                            if (!el && action.name === "Problem involving someone under 18") {
                                const altXpaths = [
                                    "//span[contains(text(),'Problem involving someone under 18')]/ancestor::div[@role='button']",
                                    "//span[contains(text(),'under 18')]"
                                ];
                                for (const alt of altXpaths) {
                                    el = await findElement(alt, 2000);
                                    if (el) break;
                                }
                            }
                            if (!el && action.name === "Threatening to share my nude images") {
                                const altXpaths = [
                                    "//span[contains(text(),'Threatening to share my nude images')]/ancestor::div[@role='button']",
                                    "//span[contains(text(),'Threatening') and contains(text(),'nude')]"
                                ];
                                for (const alt of altXpaths) {
                                    el = await findElement(alt, 2000);
                                    if (el) break;
                                }
                            }
                            if (!el && action.name === "Seems like sexual exploitation") {
                                const altXpaths = [
                                    "//span[contains(text(),'Seems like sexual exploitation')]/ancestor::div[@role='button']",
                                    "//span[contains(text(),'sexual exploitation')]"
                                ];
                                for (const alt of altXpaths) {
                                    el = await findElement(alt, 2000);
                                    if (el) break;
                                }
                            }
                            if (!el && action.name === "Next") {
                                const altXpaths = [
                                    "//span[text()='Next']/ancestor::div[@role='button']",
                                    "//span[contains(text(),'Next')]"
                                ];
                                for (const alt of altXpaths) {
                                    el = await findElement(alt, 2000);
                                    if (el) break;
                                }
                            }
                            if (!el && action.name === "Done") {
                                const altXpaths = [
                                    "//span[text()='Done']/ancestor::div[@role='button']",
                                    "//span[contains(text(),'Done')]"
                                ];
                                for (const alt of altXpaths) {
                                    el = await findElement(alt, 2000);
                                    if (el) break;
                                }
                            }
                            if (!el && action.name === "Submit") {
                                const altXpaths = [
                                    "//span[text()='Submit']/ancestor::div[@role='button']",
                                    "//span[contains(text(),'Submit')]"
                                ];
                                for (const alt of altXpaths) {
                                    el = await findElement(alt, 2000);
                                    if (el) break;
                                }
                            }
                            if (el) {
                                success = simulateClick(el);
                            }
                        }
                    } catch (e) {
                        console.warn(`Retry ${retries} for step ${action.step}:`, e);
                    }
                    if (!success && retries < maxRetries) {
                        await sleep(800 + Math.random() * 700);
                    }
                }

                if (success) {
                    addLog(`[${action.step}] ${action.name} ✓`, "green");
                } else {
                    addLog(`[${action.step}] ${action.name} ✗ (skipped)`, "yellow");
                }

                let loadCount = 0;
                while (isPageLoading() && loadCount < 10) {
                    await sleep(1000 + Math.random() * 500);
                    loadCount++;
                }
                const jitter = BASE_DELAY * (0.8 + Math.random() * 0.4);
                await sleep(jitter);
            }

            reportCount++;
            document.getElementById('chds-reports').textContent = reportCount;
            addLog(`✅ Round #${loopCount} completed`, "green");

            if (checkIsDie()) {
                addLog("🎉 Account died after round.", "green");
                stopTool();
                break;
            }
            const restTime = 3000 + Math.random() * 3000;
            addLog(`⏳ Resting ${Math.round(restTime/1000)}s before next round`, "yellow");
            await sleep(restTime);
        }
    };

    const pauseTool = () => {
        isRunning = false;
        const btn = document.getElementById('chds-start');
        btn.textContent = '▶ RESUME';
        btn.className = 'action-btn primary';
        updateStatus('Paused', 'paused');
        document.getElementById('chds-step-info').textContent = 'Paused';
        addLog("⏸ Paused", "yellow");
    };

    const stopTool = () => {
        isRunning = false;
        stopRequested = true;
        const btn = document.getElementById('chds-start');
        btn.textContent = '▶ START';
        btn.className = 'action-btn primary';
        updateStatus('Stopped', 'stopped');
        document.getElementById('chds-step-info').textContent = 'Stopped';
        updateProgress(0);
        addLog("⏹ Stopped", "red");
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUI);
    } else {
        initUI();
    }
})();
