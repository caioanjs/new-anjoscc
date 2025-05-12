// Update clock function
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}
// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

// Terminal functionality
const terminal = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');
const terminalContent = document.querySelector('.terminal-content');

// Initialize terminal with focus
window.addEventListener('DOMContentLoaded', () => {
    terminal.focus();
    // Add some initial content
    if (!output.textContent) {
        output.textContent = "Welcome to Terminal v1.0\nType 'help' for available commands\n";
    }
});

// Improved function to ensure terminal scrolls to bottom
function scrollTerminalToBottom() {
    // Force a reflow to ensure content is updated before scrolling
    void terminalContent.offsetHeight;
    
    // Use requestAnimationFrame for smoother visual updates
    requestAnimationFrame(() => {
        terminalContent.scrollTop = terminalContent.scrollHeight;
    });
}

// Handle terminal input
terminal.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent default Enter behavior
        
        const command = terminal.value.trim();
        terminal.value = ''; // Clear input immediately
        
        // Only process non-empty commands
        if (command !== '') {
            // Format consistently with no extra spaces
            if (output.textContent && !output.textContent.endsWith('\n')) {
                output.textContent += '\n';
            }
            
            // Add command to output
            output.textContent += `$ ${command}`;
            
            // Process command
            processCommand(command);
            
            // Ensure scrolling happens after DOM updates
            scrollTerminalToBottom();
        }
    }
});

// Process terminal commands
function processCommand(command) {
    // Normalize command for easier comparison
    const cmd = command.toLowerCase().trim();
    
    // Process commands
    if (cmd === 'help') {
        output.textContent += '\nAvailable commands:';
        output.textContent += '\n- help: Show this help';
        output.textContent += '\n- clear: Clear terminal';
        output.textContent += '\n- date: Show current date';
        output.textContent += '\n- echo [text]: Echo text back';
        output.textContent += '\n- ascii: Shows the ASCII Star';
    } else if (cmd === 'clear') {
        output.textContent = '';
        return; // Exit early as we don't need to add a newline
    } else if (cmd === 'date') {
        output.textContent += `\n${new Date().toString()}`;
    } else if (cmd.startsWith('echo ')) {
        output.textContent += `\n${command.substring(5)}`;
    } else if (cmd === 'ascii') {
        output.textContent += 
                          `
                           ~PGGGP~         
                           P@@@@@P         
                           P@@@@@5         
                   JBGY?~: 5@@@@@Y :~?5GBJ 
                  Y@@@@@@&B&@@@@@&B&@@@@@@J
                 B@@@@@@@@@@@@@@@@@@@@@@@B
                  .^!J5GB@@@@@@@@@@@BG5?!^.
                        !&@@@@@@@@@&!      
                      :P@@@@@@&@@@@@@5:    
                     7&@@@@@&?.?@@@@@@&7   
                     7#@@@@B^   ^B@@@@#7   
                      .!5GJ.     .JGY~     `;
    } else {
        output.textContent += `\nCommand not found: ${command}`;
    }

    // Always add a newline at the end of command output
    if (cmd !== 'clear') {
        output.textContent += '\n';
    }
    
    // Limit history if needed
    limitTerminalHistory();
}

// Limit terminal history to prevent excessive memory usage
function limitTerminalHistory() {
    const maxLines = 500;
    let lines = output.textContent.split('\n');
    
    if (lines.length > maxLines) {
        lines = lines.slice(lines.length - maxLines);
        output.textContent = lines.join('\n');
    }
}

// Ensure terminal always has focus when clicked
terminalContent.addEventListener('click', function() {
    terminal.focus();
});

// Also ensure scrolling when window is resized
window.addEventListener('resize', scrollTerminalToBottom);

// Make sure terminal scrolls to bottom on initial load
window.addEventListener('load', scrollTerminalToBottom);
