import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, ArrowUp, RefreshCw, Search, ChevronRight, Home, LayoutGrid, List, Monitor, Download, FileText, Image, Music, Video, Star, HardDrive
} from 'lucide-react';

// Icons
import folderIcon from '../../../assets/windows11iconsV1/windows11iconsV1/folders/folder.ico';
import desktopIcon from '../../../assets/windows11iconsV1/windows11iconsV1/folders/desktop.ico';
import documentsIcon from '../../../assets/windows11iconsV1/windows11iconsV1/folders/documents.ico';
import downloadsIcon from '../../../assets/windows11iconsV1/windows11iconsV1/folders/downloads.ico';
import picturesIcon from '../../../assets/windows11iconsV1/windows11iconsV1/folders/pictures.ico';
import musicIcon from '../../../assets/windows11iconsV1/windows11iconsV1/folders/music.ico';
import videosIcon from '../../../assets/windows11iconsV1/windows11iconsV1/folders/videos.ico';
import userIcon from '../../../assets/windows11iconsV1/windows11iconsV1/folders/user.ico';
import diskIcon from '../../../assets/windows11iconsV1/windows11iconsV1/devices/drives/windows.ico';
import pdfIcon from '../../../assets/windows11iconsV1/windows11iconsV1/files/document.ico'; // Fallback
import zipIcon from '../../../assets/windows11iconsV1/windows11iconsV1/folders/zip.ico';

// Mock Data
const fileSystem = {
  root: {
    id: 'root',
    name: 'This PC',
    type: 'root',
    children: ['desktop', 'downloads', 'documents', 'pictures', 'music', 'videos', 'c_drive']
  },
  desktop: {
    id: 'desktop',
    name: 'Desktop',
    icon: desktopIcon,
    type: 'folder',
    children: ['project_folder', 'resume_pdf'],
    path: 'This PC > Desktop'
  },
  downloads: {
    id: 'downloads',
    name: 'Downloads',
    icon: downloadsIcon,
    type: 'folder',
    children: ['setup_exe', 'image_png', 'windows_iso'],
    path: 'This PC > Downloads'
  },
  documents: {
    id: 'documents',
    name: 'Documents',
    icon: documentsIcon,
    type: 'folder',
    children: ['notes_txt', 'budget_xlsx'],
    path: 'This PC > Documents'
  },
  pictures: {
    id: 'pictures',
    name: 'Pictures',
    icon: picturesIcon,
    type: 'folder',
    children: ['vacation_jpg', 'profile_pic'],
    path: 'This PC > Pictures'
  },
  music: {
    id: 'music',
    name: 'Music',
    icon: musicIcon,
    type: 'folder',
    children: [], // Empty for now
    path: 'This PC > Music'
  },
  videos: {
    id: 'videos',
    name: 'Videos',
    icon: videosIcon,
    type: 'folder',
    children: [],
    path: 'This PC > Videos'
  },
  c_drive: {
    id: 'c_drive',
    name: 'Local Disk (C:)',
    icon: diskIcon,
    type: 'drive',
    children: ['program_files', 'users', 'windows'],
    path: 'This PC > Local Disk (C:)'
  },
  // Files
  project_folder: { id: 'project_folder', name: 'My-Portfolio', icon: folderIcon, type: 'folder', children: ['src', 'public'], path: 'This PC > Desktop > My-Portfolio' },
  resume_pdf: { id: 'resume_pdf', name: 'Resume.pdf', icon: pdfIcon, type: 'file', size: '1.2 MB', date: 'Yesterday' },
  setup_exe: { id: 'setup_exe', name: 'installer.exe', icon: zipIcon, type: 'file', size: '45 MB', date: 'Today' },
  image_png: { id: 'image_png', name: 'screenshot.png', icon: picturesIcon, type: 'file', size: '2.4 MB', date: 'Today' },
  windows_iso: { id: 'windows_iso', name: 'win11.iso', icon: diskIcon, type: 'file', size: '4.5 GB', date: 'Last Week' },
  notes_txt: { id: 'notes_txt', name: 'ideas.txt', icon: documentsIcon, type: 'file', size: '2 KB', date: 'Last Month' },
  budget_xlsx: { id: 'budget_xlsx', name: 'finance.xlsx', icon: documentsIcon, type: 'file', size: '14 KB', date: 'Last Month' },
  vacation_jpg: { id: 'vacation_jpg', name: 'beach.jpg', icon: picturesIcon, type: 'file', size: '4 MB', date: 'Last Year' },
  profile_pic: { id: 'profile_pic', name: 'me.jpg', icon: picturesIcon, type: 'file', size: '1.1 MB', date: 'Last Year' },
  // Subfolders
  src: { id: 'src', name: 'src', icon: folderIcon, type: 'folder', children: [], path: '...' },
  public: { id: 'public', name: 'public', icon: folderIcon, type: 'folder', children: [], path: '...' },
  program_files: { id: 'program_files', name: 'Program Files', icon: folderIcon, type: 'folder', children: [], path: 'C:\\Program Files' },
  users: { id: 'users', name: 'Users', icon: folderIcon, type: 'folder', children: [], path: 'C:\\Users' },
  windows: { id: 'windows', name: 'Windows', icon: folderIcon, type: 'folder', children: [], path: 'C:\\Windows' },
};

export default function FileExplorer() {
  const [currentPathId, setCurrentPathId] = useState('root');
  const [history, setHistory] = useState(['root']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigateTo = (id) => {
    if (fileSystem[id].type === 'file') return; // Don't navigate into files
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(id);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPathId(id);
    setSelectedItem(null);
  };

  const traverseUp = () => {
      // Very basic implementation: just go back to root or simple parent check
      // For a real FS, we'd store parentId in every node.
      // Let's just use back for now or hardcode parents.
      // Or we can find which node lists currentPathId in its children.
      const parentEntry = Object.entries(fileSystem).find(([key, val]) => val.children?.includes(currentPathId));
      if (parentEntry) {
          navigateTo(parentEntry[0]);
      }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPathId(history[historyIndex - 1]);
      setSelectedItem(null);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPathId(history[historyIndex + 1]);
      setSelectedItem(null);
    }
  };

  const currentFolder = fileSystem[currentPathId];
  // Calculate contents
  const contents = currentFolder.children ? currentFolder.children.map(childId => fileSystem[childId]) : [];

  // Sidebar Items
  const quickAccess = ['desktop', 'downloads', 'documents', 'pictures', 'music', 'videos'];

  return (
    <div className="flex flex-col h-full bg-[#202020] text-white">
      {/* 1. Header with Tabs (Simulated in Window Title, but here is the toolbar) */}
      
      {/* 2. Command Bar (New, Cut, Copy, etc) */}
      <div className="h-14 bg-[#1e1e1e] border-b border-[#333] flex items-center px-2 gap-4">
        {/* Basic Commands */}
        <div className="flex items-center gap-2">
             <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-md transition-colors text-sm">
                 <span className="text-xl font-light">+</span> <span className="text-sm">New</span>
             </button>
        </div>
        <div className="w-[1px] h-6 bg-gray-600"></div>
        <div className="flex items-center gap-1">
             <button className="p-2 hover:bg-white/10 rounded-md" title="Cut"><span className="text-sm">✂️</span></button>
             <button className="p-2 hover:bg-white/10 rounded-md" title="Copy"><span className="text-sm">📄</span></button>
             <button className="p-2 hover:bg-white/10 rounded-md" title="Paste"><span className="text-sm">📋</span></button>
             <button className="p-2 hover:bg-white/10 rounded-md" title="Rename"><span className="text-sm">✏️</span></button>
             <button className="p-2 hover:bg-white/10 rounded-md" title="Delete"><span className="text-sm">🗑️</span></button>
        </div>
        <div className="w-[1px] h-6 bg-gray-600"></div>
        <div className="flex items-center gap-2 ml-auto">
             <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-md transition-colors text-sm">
                 <span>Sort</span>
             </button>
             <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-md transition-colors text-sm">
                 <span>View</span>
             </button>
        </div>
      </div>

      {/* 3. Address Bar and Search */}
      <div className="h-12 bg-[#191919] border-b border-[#333] flex items-center px-4 gap-4">
          <div className="flex items-center gap-2">
              <button onClick={goBack} disabled={historyIndex === 0} className="p-1.5 hover:bg-white/10 rounded-full disabled:opacity-30 transition-colors">
                  <ArrowLeft size={16} />
              </button>
              <button onClick={goForward} disabled={historyIndex === history.length - 1} className="p-1.5 hover:bg-white/10 rounded-full disabled:opacity-30 transition-colors">
                  <ArrowRight size={16} />
              </button>
              <button onClick={traverseUp} className="p-1.5 hover:bg-white/10 rounded-full transition-colors ml-1">
                  <ArrowUp size={16} />
              </button>
          </div>

          {/* Breadcrumb Path */}
          <div className="flex-1 bg-[#2c2c2c] hover:bg-[#333] border border-[#3d3d3d] h-8 rounded-md flex items-center px-3 gap-2 transition-colors cursor-text group">
              <Monitor size={14} className="text-gray-400 group-focus-within:text-white" />
              <div className="flex items-center text-sm text-gray-300 w-full">
                  {currentPathId === 'root' ? (
                      <span className="hover:bg-white/10 px-1 rounded cursor-pointer">This PC</span>
                  ) : (
                       fileSystem[currentPathId]?.path.split(' > ').map((part, i, arr) => (
                           <React.Fragment key={i}>
                               <span className="hover:bg-white/10 px-1 rounded cursor-pointer transition-colors" onClick={() => {/* Handle jump */}}>{part}</span>
                               {i < arr.length - 1 && <span className="text-gray-500 mx-0.5">›</span>}
                           </React.Fragment>
                       ))
                  )}
              </div>
              <RefreshCw size={14} className="text-gray-400 ml-auto hover:text-white cursor-pointer" />
          </div>

          {/* Search Box */}
          <div className="w-64 bg-[#2c2c2c] hover:bg-[#333] border border-[#3d3d3d] h-8 rounded-md flex items-center px-3 gap-2 transition-colors">
              <Search size={14} className="text-gray-400" />
              <input type="text" placeholder={`Search ${currentFolder?.name || 'This PC'}`} className="bg-transparent border-none outline-none text-xs text-white placeholder:text-gray-500 w-full" />
          </div>
      </div>

      {/* 4. Main Body: Sidebar + Grid */}
      <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-60 bg-[#121212] border-r border-[#333] overflow-y-auto py-4 flex flex-col gap-1">
               {/* Pinned / Quick Access */}
               <div className="px-4 mb-2">
                   <div className="flex items-center gap-2 mb-2 text-gray-400 hover:text-white cursor-pointer">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold uppercase tracking-wider">Quick Access</span>
                   </div>
                   <div className="flex flex-col gap-0.5 pl-2">
                       {quickAccess.map(id => {
                           const item = fileSystem[id];
                           return (
                               <button 
                                key={id} 
                                onClick={() => navigateTo(id)}
                                className={`flex items-center gap-3 px-3 py-1.5 rounded-sm text-sm transition-colors text-left ${currentPathId === id ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                               >
                                   <img src={item.icon} className="w-4 h-4" alt=""/>
                                   {item.name}
                               </button>
                           )
                       })}
                   </div>
               </div>
               
               {/* This PC */}
               <div className="px-4 mt-2">
                    <div className="flex items-center gap-2 mb-2 text-gray-400 hover:text-white cursor-pointer">
                        <Monitor size={14} />
                        <span className="text-xs font-bold uppercase tracking-wider">This PC</span>
                   </div>
                    <div className="flex flex-col gap-0.5 pl-2">
                       <button onClick={() => navigateTo('c_drive')} className={`flex items-center gap-3 px-3 py-1.5 rounded-sm text-sm transition-colors text-left ${currentPathId === 'c_drive' ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
                           <img src={diskIcon} className="w-4 h-4" alt=""/>
                           Local Disk (C:)
                       </button>
                    </div>
               </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-[#191919] p-4 overflow-y-auto" onClick={() => setSelectedItem(null)}>
              {/* Group Label (e.g. "Folders" or "Files") */}
              {contents.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
                    {contents.map(item => (
                        <div 
                            key={item.id}
                            onClick={(e) => { e.stopPropagation(); setSelectedItem(item.id); }}
                            onDoubleClick={() => navigateTo(item.id)}
                            className={`flex flex-col items-center p-2 rounded-sm border border-transparent hover:bg-white/5 hover:border-white/5 transition-all cursor-default group ${selectedItem === item.id ? 'bg-white/10 border-white/10' : ''}`}
                        >
                            <img src={item.icon} alt={item.name} className="w-16 h-16 mb-2 drop-shadow-md" />
                            <span className="text-[13px] text-center text-gray-200 line-clamp-2 w-full break-words leading-tight group-hover:text-white">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
              ) : (
                  <div className="text-gray-500 text-sm italic text-center mt-20">This folder is empty.</div>
              )}
          </div>
      </div>

      {/* 5. Status Bar */}
      <div className="h-8 bg-[#202020] border-t border-[#333] flex items-center px-4 text-xs text-gray-400 justify-between">
          <div className="flex items-center gap-4">
               <span>{contents.length} items</span>
               {selectedItem && <span>1 item selected</span>}
          </div>
          <div className="flex items-center gap-4">
              <button><List size={14}/></button>
              <button><LayoutGrid size={14} className="text-white" /></button>
          </div>
      </div>
    </div>
  );
}