// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   FileText, 
//   Calculator, 
//   BookOpen, 
//   GraduationCap, 
//   BarChart3,
//   X
// } from 'lucide-react';

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const navigation = [
//   { name: 'Dashboard', href: '/', icon: LayoutDashboard },
//   { name: 'Contract Initiation', href: '/contract', icon: FileText },
//   { name: 'Calculations', href: '/calculations', icon: Calculator },
//   { name: 'Methodology', href: '/methodology', icon: BookOpen },
//   { name: 'Education', href: '/education', icon: GraduationCap },
//   { name: 'Reports', href: '/reports', icon: BarChart3 },
// ];

// export function Sidebar({ isOpen, onClose }: SidebarProps) {
//   const location = useLocation();

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
//           onClick={onClose}
//         />
//       )}
      
//       {/* Sidebar */}
//       <div className={`
//         fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
//         lg:relative lg:translate-x-0 lg:z-0
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="flex items-center justify-between p-6 border-b border-slate-200">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
//                 <FileText className="w-4 h-4 text-white" />
//               </div>
//               <span className="font-semibold text-slate-900">IFRS 16</span>
//             </div>
//             <button
//               onClick={onClose}
//               className="lg:hidden p-1 hover:bg-slate-100 rounded"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
          
//           {/* Navigation */}
//           <nav className="flex-1 p-4">
//             <ul className="space-y-2">
//               {navigation.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 return (
//                   <li key={item.name}>
//                     <Link
//                       to={item.href}
//                       onClick={onClose}
//                       className={`
//                         flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
//                         ${isActive 
//                           ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
//                           : 'text-slate-700 hover:bg-slate-100'
//                         }
//                       `}
//                     >
//                       <item.icon className="w-4 h-4" />
//                       {item.name}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           </nav>
          
//           {/* Footer */}
//           <div className="p-4 border-t border-slate-200">
//             <div className="text-xs text-slate-500 text-center">
//               IFRS 16 Leases Solution v2.0
//               <br />
//               Professional Edition
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }