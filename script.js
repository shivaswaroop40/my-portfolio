// Terminal TUI JavaScript
class Terminal {
    constructor() {
        this.input = document.getElementById('terminal-input');
        this.content = document.getElementById('terminal-content');
        this.history = [];
        this.historyIndex = -1;
        this.currentPath = '~';
        
        this.commands = {
            'help': this.showHelp.bind(this),
            'clear': this.clear.bind(this),
            'ls': this.listFiles.bind(this),
            'cat': this.catFile.bind(this),
            'cd': this.changeDirectory.bind(this),
            'pwd': this.printWorkingDirectory.bind(this),
            'whoami': this.whoami.bind(this),
            'date': this.showDate.bind(this),
            'about': this.showAbout.bind(this),
            'experience': this.showExperience.bind(this),
            'education': this.showEducation.bind(this),
            'skills': this.showSkills.bind(this),
            'projects': this.showProjects.bind(this),
            'welcome': this.showWelcome.bind(this),
            'exit': this.exit.bind(this),
            'history': this.showHistory.bind(this),
            'echo': this.echo.bind(this),
            'uname': this.uname.bind(this),
            'uptime': this.uptime.bind(this)
        };
        
        this.files = {
            'about.txt': 'about',
            'experience.txt': 'experience', 
            'education.txt': 'education',
            'skills.txt': 'skills',
            'projects.txt': 'projects',
            'README.md': 'welcome'
        };
        
        this.init();
    }
    
    init() {
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.input.focus();
        
        // Auto-scroll when content changes
        const observer = new MutationObserver(() => {
            this.scrollToBottom();
        });
        observer.observe(this.content, { childList: true, subtree: true });
    }
    
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.executeCommand();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHistory(-1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHistory(1);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autoComplete();
        }
    }
    
    executeCommand() {
        const command = this.input.value.trim();
        if (command === '') return;
        
        this.addToHistory(command);
        this.addCommandLine(command);
        this.input.value = '';
        
        const [cmd, ...args] = command.split(' ');
        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.addOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
        
        // Force scroll to bottom after command execution
        setTimeout(() => this.scrollToBottom(), 50);
        setTimeout(() => this.scrollToBottom(), 100);
    }
    
    addCommandLine(command) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="prompt">shivaswaroop@portfolio:${this.currentPath}$</span><span class="command">${command}</span>`;
        this.content.appendChild(line);
    }
    
    addOutput(text, type = 'info') {
        const output = document.createElement('div');
        output.className = `command-output ${type}`;
        
        // Check if this is file content that needs highlighting
        if (type === 'info' && this.isFileContent(text)) {
            output.innerHTML = this.highlightText(text);
        } else {
            // Strip HTML tags and convert to plain text
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = text;
            output.textContent = tempDiv.textContent || tempDiv.innerText || '';
        }
        
        this.content.appendChild(output);
        this.scrollToBottom();
    }
    
    isFileContent(text) {
        // Check if text contains typical file content patterns
        return text.includes('##') || text.includes('###') || text.includes('**') || 
               text.includes('Email:') || text.includes('LinkedIn:') || text.includes('GitHub:') ||
               text.includes('KTH') || text.includes('AWS') || text.includes('Kubernetes') ||
               text.includes('Terraform') || text.includes('Docker') || text.includes('Python');
    }
    
    highlightText(text) {
        return text
            // Headers
            .replace(/^(#{1,6})\s+(.+)$/gm, '<h$1 class="highlight-header">$2</h$1>')
            // Bold text
            .replace(/\*\*(.+?)\*\*/g, '<strong class="highlight-bold">$1</strong>')
            // Email links (only if not already in HTML tags)
            .replace(/(?<!<[^>]*)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(?![^<]*>)/g, '<a href="mailto:$1" class="highlight-email">$1</a>')
            // URLs (only if not already in HTML tags)
            .replace(/(?<!<[^>]*)(https?:\/\/[^\s]+)(?![^<]*>)/g, '<a href="$1" target="_blank" class="highlight-url">$1</a>')
            // Technical terms (only if not already in HTML tags)
            .replace(/(?<!<[^>]*)\b(AWS|Azure|Kubernetes|Docker|Terraform|Ansible|Python|Go|JavaScript|React|Node\.js|Git|GitHub|GitLab|CI\/CD|DevOps|Cloud|Infrastructure|Security|Monitoring|Grafana|Prometheus|Graylog|ArgoCD|Kyverno|Buildah|Cosign|VXLAN|RDMA|PKI|OpenSSL|IPTables|SSL\/TLS|GPG|OSPF|BGP|KTH|M\.S Ramaiah|Stockholm|Bengaluru|Sweden|India)\b(?![^<]*>)/g, '<span class="highlight-tech">$1</span>')
            // Dates and time periods
            .replace(/(\d{4}\s*–\s*\d{4}|\d{4}\s*–\s*Present|\d+\s*years?\s*\d+\s*months?|\d+\s*months?)/g, '<span class="highlight-date">$1</span>')
            // Percentages and numbers
            .replace(/(\d+%|\d+\.\d+%|\d+\.\d+\/10)/g, '<span class="highlight-number">$1</span>')
            // List items
            .replace(/^(\s*[-*+]\s+)/gm, '<span class="highlight-bullet">$1</span>')
            // Code-like terms
            .replace(/\b(EC2|S3|VPC|IAM|Lambda|ECS|EKS|CloudFormation|CloudWatch|Route 53|ARM Templates|Azure Monitor|AKS|Container Instances|Azure DevOps)\b/g, '<span class="highlight-code">$1</span>')
            // Line breaks
            .replace(/\n/g, '<br>');
    }
    
    addToHistory(command) {
        this.history.push(command);
        this.historyIndex = this.history.length;
    }
    
    navigateHistory(direction) {
        if (this.history.length === 0) return;
        
        this.historyIndex += direction;
        this.historyIndex = Math.max(0, Math.min(this.history.length, this.historyIndex));
        
        if (this.historyIndex < this.history.length) {
            this.input.value = this.history[this.historyIndex];
        } else {
            this.input.value = '';
        }
    }
    
    autoComplete() {
        const input = this.input.value.trim();
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            this.input.value = matches[0];
        } else if (matches.length > 1) {
            this.addOutput(`Available commands: ${matches.join(', ')}`);
        }
    }
    
    scrollToBottom() {
        // Use requestAnimationFrame to ensure DOM updates are complete
        requestAnimationFrame(() => {
            this.content.scrollTop = this.content.scrollHeight;
        });
    }
    
    // Command implementations
    showHelp() {
        const helpText = `Available commands:
  help          - Show this help message
  clear         - Clear the terminal
  ls            - List files and directories
  cat <file>          - Display file contents
  cd <dir>           - Change directory
  pwd           - Print working directory
  whoami        - Display current user
  date          - Show current date and time
  about         - Show about information
  experience    - Show professional experience
  education     - Show educational background
  skills        - Show technical skills
  projects      - Show projects
  welcome       - Show welcome message
  history       - Show command history
  echo <text>         - Echo text to terminal
  uname         - Show system information
  uptime        - Show system uptime
  exit          - Exit terminal`;
        this.addOutput(helpText);
    }
    
    clear() {
        this.content.innerHTML = '';
    }
    
    listFiles() {
        const files = Object.keys(this.files);
        const output = files.map(file => {
            const icon = file.endsWith('.txt') ? '📄' : '📋';
            return `${icon} ${file}`;
        }).join('\n');
        this.addOutput(output);
    }
    
    catFile(args) {
        if (args.length === 0) {
            this.addOutput('Usage: cat <filename>', 'error');
            return;
        }
        
        const filename = args[0];
        if (this.files[filename]) {
            this.showPage(this.files[filename]);
        } else {
            this.addOutput(`File not found: ${filename}`, 'error');
        }
    }
    
    changeDirectory(args) {
        if (args.length === 0 || args[0] === '~' || args[0] === 'home') {
            this.currentPath = '~';
            this.addOutput('Changed to home directory');
        } else {
            this.addOutput(`Directory not found: ${args[0]}`, 'error');
        }
    }
    
    printWorkingDirectory() {
        this.addOutput(this.currentPath);
    }
    
    async whoami() {
        try {
            // First try to get IP from a free service
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            this.addOutput(`shivaswaroop (IP: ${data.ip})`);
        } catch (error) {
            // Fallback to a different service
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                this.addOutput(`shivaswaroop (IP: ${data.ip})`);
            } catch (fallbackError) {
                // Final fallback
                this.addOutput('shivaswaroop (IP: Unable to fetch)');
            }
        }
    }
    
    showDate() {
        const now = new Date();
        this.addOutput(now.toString());
    }
    
    showAbout() {
        this.showPage('about');
    }
    
    showExperience() {
        this.showPage('experience');
    }
    
    showEducation() {
        this.showPage('education');
    }
    
    showSkills() {
        this.showPage('skills');
    }
    
    showProjects() {
        this.showPage('projects');
    }
    
    showWelcome() {
        this.showPage('welcome');
    }
    
    showPage(pageName) {
        const pageContent = document.getElementById(`${pageName}-content`);
        if (pageContent) {
            // Convert HTML to plain text
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = pageContent.innerHTML;
            const plainText = tempDiv.textContent || tempDiv.innerText || '';
            this.addOutput(plainText);
        } else {
            this.addOutput(`Page not found: ${pageName}`, 'error');
        }
    }
    
    exit() {
        this.addOutput('Goodbye! Thanks for visiting my portfolio.');
        setTimeout(() => {
            window.close();
        }, 1000);
    }
    
    showHistory() {
        if (this.history.length === 0) {
            this.addOutput('No commands in history');
        } else {
            this.addOutput(this.history.map((cmd, i) => `${i + 1}  ${cmd}`).join('\n'));
        }
    }
    
    echo(args) {
        this.addOutput(args.join(' '));
    }
    
    uname() {
        this.addOutput('Linux portfolio 5.4.0-42-generic #46-Ubuntu SMP Fri Jul 10 00:24:02 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux');
    }
    
    uptime() {
        this.addOutput('Portfolio has been running since the beginning of time (or at least since you opened this page)');
    }
}

// Initialize terminal when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});
